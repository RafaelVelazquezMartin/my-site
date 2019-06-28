import {
  trigger,
  stagger,
  animate,
  style,
  group,
  query,
  transition,
  keyframes
} from "@angular/animations";

export const homeTransition = trigger("homeTransition", [
  transition(":enter", [
    query(".block", style({ width: "*", opacity: 0 }), {
      optional: true
    }),
    query(
      ".block",
      [
        style({
          transform: "translateY(100px)"
        }),
        animate(
          "1s cubic-bezier(.75,-0.48,.26,1.52)",
          style({ transform: "translateY(0px)", opacity: 1 })
        )
      ],
      { optional: true }
    )
  ]),
  transition(":leave", [
    query(".block", style({ width: "!" }), {
      optional: true
    }),
    query(
      ".block",
      [
        style({
          transform: "translateY(0px)",
          opacity: 1
        }),
        animate(
          "0.4s cubic-bezier(.75,-0.48,.26,1.52)",
          style({ transform: "translateY(100px)", opacity: 0 })
        )
      ],
      { optional: true }
    )
  ])
]);
