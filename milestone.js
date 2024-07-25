class Milestone {
  constructor(display_name, y_pos, min_age, max_age, colour) { // TODO add param for phrases
    this.display_name = display_name
    this.y_pos = y_pos
    this.toggled = 0
    this.min_age = min_age
    this.max_age = max_age
    this.mean_age = (this.min_age + this.max_age) / 2 // TODO improve
    this.colour = colour
  }
  
  write_text(){
    push() // Write milestone display name
    stroke(0);
    strokeWeight(2)
    noStroke()
    fill(0);
    textAlign(CENTER, CENTER);
    text(this.display_name, this.mean_x, this.y_pos);
    pop()
  }
  
  draw_box(){
    push() // Draw rectangle. Add black stroke if selected positively, red if selected negatively 
    if (this.toggled == 1) {stroke(2)} else if (this.toggled == 2) {stroke(255, 0, 0)} else {noStroke()}
    rectMode(CENTER)
    fill(this.colour)
    this.h = 25; // Height
    rect(this.mean_x, this.y_pos, this.w, this.h);
    pop()
  }
  
  show() {
    this.min_x = map(this.min_age, 0, max_month, 80, width-padding_right);
    this.max_x = map(this.max_age, 0, max_month, 80, width-padding_right);
    this.mean_x = map(this.mean_age, 0, max_month, 80, width-padding_right);
    this.w = this.max_x - this.min_x
    
    this.draw_box()
    this.write_text()
  }

  toggle() {
    this.toggled = (this.toggled + 1) % 3
  }
}