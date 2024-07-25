let age_slider_y = 80
let start_x = 80

class Age {
  constructor(months=18) {
    this.months = months
    this.update()
  }
  
  update() {
    this.convert()
    this.show()
  }
  
  convert(){
    this.y = floor(this.months / 12)
    this.m = this.months % 12
    
    this.years_str = this.y > 0 ? `${this.y} an${this.y > 1 ? 's' : ''}` : ''; // ans, an or ...
    this.months_str = this.m > 0 ? `${this.m} mois` : ''; // mois or ... 
    
    this.and = this.years_str && this.months_str ? 'et' : ''; // et or ...
    this.texte = `${this.years_str} ${this.and} ${this.months_str}`;
    this.texte = this.texte.trim()
  }
  
  show_bar(){
    let end_x = width-padding_right
    line(start_x, age_slider_y, end_x, age_slider_y)
    let line_months = [6, 12, 18, 24, 30] //, 36, 42, 48, 54, 60, 66]
    
    for (let i = 0; i < line_months.length; i++) {
      let tick_x = map(line_months[i], 0, max_month, start_x, end_x)
      line(tick_x, age_slider_y-5, tick_x, age_slider_y+5)
    }
  }
  
  show_age_header(){
    push()
    fill(55)
    textSize(32)
    textAlign(CENTER, CENTER);
    text(this.texte, width / 2, 30)
    pop()
  }
  
  show_slider(){
    push() // Slider button
    rectMode(CENTER);
    strokeWeight(2)
    stroke(162, 196, 201)
    fill(137, 207, 240)
    
    this.x = map(this.months, 0, max_month, 80, width-padding_right);
    this.y = age_slider_y;
    this.w = 60; // Width
    this.h = 30; // Height
    let r = 20;  // Corner radius
    rect(this.x, this.y, this.w, this.h, r);
    pop()
    
    push() // Text in slider
    fill(55)
    textSize(16)
    textAlign(CENTER, CENTER);
    text(`${this.months} mois`, this.x, this.y)
    pop()
  }
  
  show() {
    this.show_bar()
    this.show_age_header()
    this.show_slider()
  }
}