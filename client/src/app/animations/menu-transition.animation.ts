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

export const menuTransition = trigger("homeTransition", [
  transition("true => false", [])
]);
