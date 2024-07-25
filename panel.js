let milestone_offset = 30 // How much each milestone is offset down from each other

class Panel {
  constructor(title, colour, milestones){
    this.title = title
    this.colour = colour
    this.milestones = []
    for (let j in milestones){
      this.milestones.push(new Milestone(j, 0, milestones[j][0], milestones[j][1], this.colour))
    }
    this.select_mstones()
  }
  
  update(start_y) {
    this.select_mstones()
    this.show(start_y)
  }
  
  select_mstones(){ // Select milestones in +- 6 months
    let from_age = age.months - 6
    let to_age = age.months + 6
    this.mstones_to_show = []
    for (let m in this.milestones){
      if (this.milestones[m].min_age <= to_age && this.milestones[m].min_age >= from_age){
        this.mstones_to_show.push(this.milestones[m])
      }
    }
  }
  
  write_text(start_y){ // Panel title on the side for each category
    let end_y = start_y + milestone_offset * this.mstones_to_show.length
    push() // Rotated text
    strokeWeight(2);
    textSize(24)
    fill(this.colour);
    translate(50, (start_y + end_y)/2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text(this.title, 0, 0);
    pop()
  }
  
  draw_box(start_y){
    this.end_y = milestone_offset * this.mstones_to_show.length
    
    push() // thin rectangle on the left
    noStroke()
    fill(this.colour)
    rect(70, start_y, 10, this.end_y);
    pop()
    
    push() // Thin rectangle around
    strokeWeight(2)
    stroke(this.colour)
    noFill()
    rect(70, start_y, width-padding_right, this.end_y)
    pop()
    
    push() // Thin line for age
    strokeWeight(1)
    stroke(this.colour)
    line(age.x, start_y, age.x, start_y + this.end_y)
    pop()
  }
  
  draw_milestones(start_y){
    let milestone_position = start_y + 15 // y first milestone
    for (let m in this.mstones_to_show){
      this.mstones_to_show[m].y_pos = milestone_position
      this.mstones_to_show[m].show()
      milestone_position = milestone_position + milestone_offset // increment between milestone of 30
    }
  }
  
  show(start_y) {
    if (this.mstones_to_show.length > 0 ) { // Only draws the panel if there are milestones to show.
      this.draw_box(start_y)
      this.write_text(start_y)
      this.draw_milestones(start_y)
    }
  }
}
