  ngOnInit() {
    this.techService
      .getTechnologies()
      .pipe(take(1))
      .subscribe((technologies: Technology[]) => {
        this.technologies = technologies;
      });

    this.route.data.subscribe(
      (data: { project: Project }) => {
        console.log(data);

        if (data.project) {
          this.project = data.project;
          console.log(this.project);
          this.slug = data.project.slug;
          this.author = data.project.author;
        }
        this.editMode = typeof data.project != "undefined";
        this.initForm(this.project);
      },
      error => {
        console.log(error);
      }
    );
  }

  private initForm(project) {
    let projectName = "";
    let projectDescription = "";
    let projectImportance = 3;
    let projectImages = new FormArray([]);
    let projectStack = new FormArray([]);

    if (this.editMode) {
      // const project = this.projectService.getProjectBySlug(this.slug);
      projectName = project.name;
      projectImportance = project.importance;
      projectDescription = project.description;
      if (project.stack) {
        for (let tech of project.stack) {
          console.log(tech.name);
          projectStack.push(new FormControl(tech._id, Validators.required));
        }
      }

      if (project.images) {
        for (let image of project.images) {
          projectImages.push(
            new FormGroup({
              _id: new FormControl(image._id, Validators.required),
              title: new FormControl(image.title, Validators.required),
              caption: new FormControl(image.caption, Validators.required)
            })
          );
        }
      }
    }

    this.projectForm = new FormGroup({
      name: new FormControl(projectName, Validators.required),
      description: new FormControl(projectDescription, Validators.required),
      importance: new FormControl(projectImportance, [
        Validators.required,
        Validators.min(0),
        Validators.max(4)
      ]),
      stack: projectStack,
      images: projectImages
    });
  }

  onProjectSaved() {
    const newProject = {
      name: this.projectForm.value.name,
      description: this.projectForm.value.description,
      images: this.project.images.map(images => images._id),
      stack: this.projectForm.value.stack,
      importance: this.projectForm.value.importance
    };

    console.log(newProject);

    const files: Array<ImageUpload> = this.filesToUpload;
    console.log(files);

    // formData.append("name", newProject.name);
    // formData.append("description", newProject.description);
    // formData.append("importance", newProject.importance);
    // formData.append("stack", JSON.stringify(newProject.stack));

    for (let i = 0; i < files.length; i++) {
      const formData: any = new FormData();
      formData.append("image", files[i].file[0], files[i].file[0]["name"]);
      formData.append("imageTitle", files[i].title);
      formData.append("imageCaption", files[i].caption);

      this.imgService.uploadImage(formData).subscribe(image => {
        console.log(image);
        newProject.images.push(image["_id"]);
      });
    }

    if (this.editMode) {
      this.projectService.updateProject(this.project._id, newProject).subscribe(
        response => {
          console.log(response);
          this.slug = response["updatedProject"].slug;
          this.router.navigate(["../../", this.slug], {
            relativeTo: this.route
          });
        },
        error => {
          console.log(error);
        },
        () => {}
      );
    } else {
      this.projectService.addProject(newProject).subscribe(
        response => {
          console.log(response);
          this.router.navigate(["../", response["updatedProject"].slug], {
            relativeTo: this.route
          });
        },
        error => {
          console.log(error);
        },
        () => {}
      );
    }
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onAddTechnologyFormControl() {
    (<FormArray>this.projectForm.get("stack")).push(
      new FormControl("", Validators.required)
    );
  }

  onDeleteTechnologyFormControl(techIndex: number) {
    (<FormArray>this.projectForm.get("stack")).removeAt(techIndex);
  }

  getStack(): FormArray {
    return <FormArray>this.projectForm.get("stack");
  }

  onAddImageFormGroup() {
    const group = new FormGroup({
      title: new FormControl("", Validators.required),
      caption: new FormControl("", Validators.required)
    });

    (<FormArray>this.projectForm.get("images")).push(group);
  }

  onDeleteImageFormGroup(imageIndex: number) {
    (<FormArray>this.projectForm.get("images")).removeAt(imageIndex);
  }

  getImages(): FormArray {
    return <FormArray>this.projectForm.get("images");
  }

  fileChangeEvent(fileInput: any, index: number) {
    this.filesToUpload.push({
      title: this.getImages().controls[index].value.title,
      caption: this.getImages().controls[index].value.caption,
      file: fileInput.target.files
    });
    console.log(this.filesToUpload);
    if (this.filesToUpload) {
      for (let image of this.filesToUpload) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.fileUrls.push(event.target.result);
          this.isDataAvailable = true;
        };
        reader.readAsDataURL(image.file[0]);
      }
    }
  }
}
