class Panel {
  constructor(title, colour, milestones){
    this.title = title
    this.colour = colour
    this.milestones = []
    for (let j in milestones){
      this.milestones.push(new Milestone(j, 150, milestones[j][0], milestones[j][1], this.colour))
    }
    this.select_mstones()

  }
  
  update(start_y) {
    this.select_mstones()
    this.show(start_y)
  }
  
  select_mstones(){
    let from_age = age.months - 6
    let to_age = age.months + 6
    this.mstones_to_show = []
    for (let m in this.milestones){
      if (this.milestones[m].min_age <= to_age && this.milestones[m].min_age >= from_age){
        this.mstones_to_show.push(this.milestones[m])
        }
    }
  }
  
  write_text(start_y){
    let end_y = start_y + 30 * this.mstones_to_show.length
    push()
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
    this.end_y = 30 * this.mstones_to_show.length
    push()
    noStroke()
    fill(this.colour)
    rect(70, start_y, 10, this.end_y);
    pop()
    
    
    push()
    strokeWeight(2)
    stroke(this.colour)
    noFill()
    rect(70, start_y, width-side_panel, this.end_y)
    pop()
    
    push()
    strokeWeight(1)
    stroke(this.colour)
    line(age.x, start_y, age.x, start_y + this.end_y)
    pop()
  }
  
  draw_milestones(start_y){
    let mstone_pos = start_y + 15
    for (let m in this.mstones_to_show){
      this.mstones_to_show[m].y_pos = mstone_pos
      this.mstones_to_show[m].show()
      mstone_pos = mstone_pos + 30
    }
  }
  
  show(start_y) {
    if (this.mstones_to_show.length > 0 ) {
      this.draw_box(start_y)
      this.write_text(start_y)
      this.draw_milestones(start_y)
    }
    
    
  }
  
}
