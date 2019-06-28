import {
  trigger,
  animate,
  style,
  group,
  query,
  sequence,
  transition,
  animateChild
} from "@angular/animations";

export const routerTransition = trigger("routerTransition", [
  transition("projects <=> project", [
    query(":enter", [style({ opacity: 0 })], {
      optional: true
    }),
    group([
      query(
        ":leave",
        [style({ opacity: 1 }), animate("0.3s", style({ opacity: 0 }))],
        { optional: true }
      ),
      query(
        ":enter",
        [style({ opacity: 0 }), animate("0.3s", style({ opacity: 1 }))],
        { optional: true }
      )
    ])
  ]),

  transition("* => *", [
    // query(":enter, :leave", style({ position: "fixed", width: "100%" }), {
    query(
      ":enter",
      style({
        //  width: "100%",
        transform: "translateX(100vw)",
        height: "!"
      }),
      {
        optional: true
      }
    ),
    // style({ height: "!", width: "100%" }),

    query(
      ":enter, :leave",
      style({
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        width: "100%"
      }),
      {
        optional: true
      }
    ),

    sequence([
      query(":leave", [style({}), animateChild()], {
        optional: true
      }),
      group([
        query(
          ":leave",
          [
            style({ transform: "translateX(0%)" }),
            animate(
              "650ms cubic-bezier(.75,-0.48,.26,1.52)",
              style({ transform: "translateX(-100vw)" })
            )
          ],
          { optional: true }
        ),
        query(
          ":enter",
          [
            style({ transform: "translateX(100%)" }),
            animate(
              "650ms cubic-bezier(.75,-0.48,.26,1.52)",
              style({ transform: "translateX(0%)" })
            )
          ],
          { optional: true }
        )
      ]),
      query(":enter", animateChild(), { optional: true })
    ])
  ])
]);
