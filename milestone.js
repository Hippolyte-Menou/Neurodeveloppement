class Milestone {
  constructor(display_name, y_pos, min_age, max_age, colour) {
    this.display_name = display_name;
    this.y_pos = y_pos
    this.toggled = false;
    this.min_age = min_age;
    this.max_age = max_age;
    this.mean_age = (this.min_age + this.max_age) / 2
    this.colour = colour
  }
  
  write_text(){
    push()
    stroke(0);
    strokeWeight(2);
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    text(this.display_name, this.mean_x, this.y_pos);
    pop()
  }
  
  draw_box(){
    push()
    if (this.toggled) {stroke(2)} else {noStroke()}
    rectMode(CENTER);
    fill(this.colour)
    this.h = 25; // Height
    rect(this.mean_x, this.y_pos, this.w, this.h);
    pop()
  }
  
  show() {
    this.min_x = map(this.min_age, 0, 36, 80, width-side_panel);
    this.max_x = map(this.max_age, 0, 36, 80, width-side_panel);
    this.mean_x = map(this.mean_age, 0, 36, 80, width-side_panel);
    this.w = this.max_x - this.min_x
    
    this.draw_box()
    this.write_text()
    
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}