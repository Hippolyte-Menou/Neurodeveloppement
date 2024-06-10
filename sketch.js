let age
let dragging = false;
let milestones;
let panels = []
let age_pressed = false
let max_month = 36
let paragraph
let output_text
let side_panel = 80
let start_y
let explainer
let dvlp_normal
let dvlp_dyn
let dlvp_basic


let colours = {"Motricité Globale": "#7BD3EA", 
               "Motricité Fine": "#A1EEBD",
               "Langage": "#F6F7C4",
               "Contact Social": "#F6D6D6"}

function preload() {
  milestones = loadJSON('milestones.json');
  milestones_phrases = loadJSON("milestones_phrases.json")
}

function setup() {
  let canvas = createCanvas(800, 2200);
  canvas.parent("sketch-holder")
  canvas.position(0,150)
  background(255)
  age = new Age(16);
  
  for (let i in milestones){
    panels.push(new Panel(i, colours[i], milestones[i]))
  }
  
  copy_button = createButton('Copier');
  copy_button.position(865, 140);
  copy_button.size(200);
  copy_button.mousePressed(copyStringToClipboard);
  
  dvlp_dyn = createP("Concernant le développement psychomoteur,")
  dvlp_dyn.position(850, 150)
  dvlp_dyn.style("padding", "15px")
  }

function draw() {
  background(255);
  age.update()
  draw_panels()
  draw_reset()

  dvlp_dyn.html(get_dyn_dvlp())
  
}

function draw_panels(){
  start_y = 150
  for (let panel in panels) {
    panels[panel].update(start_y)
    start_y = start_y + panels[panel].mstones_to_show.length * 30 + 50
  }  
}

function draw_reset(){
  push()
  fill("#FF6961")
  noStroke()
  rectMode(CENTER)
  rect(125, start_y, 100, 30) // Go change in mousePressed()
  fill("black")
  textSize(20)
  textStyle(ITALIC)
  textAlign(CENTER, CENTER)
  text("Reset", 125, start_y)
  pop()
}


function mousePressed(){
  if (mouseX >= age.x - age.w/2 && mouseX <= age.x + age.w/2 && mouseY >= age.y - age.h/2 && mouseY <= age.y + age.h/2) {
    age_pressed = true
  }
  if (mouseX >= 125 - 100/2 && mouseX <= 125 + 100/2 && mouseY >= start_y - 30/2 && mouseY <= start_y + 30/2) {
    reset_dvlp()
  }
  
  for (let i in panels){
    for (let j in panels[i].milestones){
      m = panels[i].milestones[j]
      if (mouseX >= m.min_x && mouseX <= m.max_x && mouseY >= m.y_pos-12 && mouseY <= m.y_pos+12){
        m.toggle()
        }
    }
  }
}

function mouseDragged() {
  if (age_pressed) {
    mouse_x = constrain(mouseX, 80, width-side_panel)
    new_age = map(mouse_x, 80, width-side_panel, 0, max_month);
    new_age = Math.round(new_age)
    age.months = new_age
  }
}

function mouseReleased(){
  age_pressed = false
}

function get_dyn_dvlp(){
  let to_sentence = {"Motricité Globale": "Sur le plan de la motricité globale, ", "Motricité Fine": "Sur le plan de la motricité fine, ", "Langage": "Sur le plan du langage, ", "Contact Social": "Sur le plan du contact social, "}
  output_text = `Concernant le  developpement psychomoteur de l'enfant ... évalué(e) à un âge de ${age.texte} : <br>`
  output_text += "<br>Il/Elle a marché à ... mois, dit ses premiers mots (autre que papa/mama) à l'âge de ..., dit une phrase à ... ans<br>"
  for (let i in panels){
     output_text += `<br>${to_sentence[panels[i].title]} il/elle `
    for (let j in panels[i].milestones){
      m = panels[i].milestones[j]
      if (m.toggled == 1){
        output_text += `${milestones_phrases[panels[i].title][m.display_name][0]}, `
          }
        }
    for (let j in panels[i].milestones){
      m = panels[i].milestones[j]
      if (m.toggled == 2){
        output_text += `${milestones_phrases[panels[i].title][m.display_name][2]}, `
          }
        }
    }
  return output_text
}

function write_text(h){
  push()
  textAlign(LEFT, CENTER)
  text(output_text, 80, h + 20)
  pop()
}

function keyPressed() {
  if (key === 'c') {
    copyStringToClipboard (output_text);
  }

}

function reset_dvlp(){
  for (let i in panels){
    for (let j in panels[i].milestones){
      m = panels[i].milestones[j]
      m.toggled = false
        }
    }
}

function copyStringToClipboard (str) {
   var el = document.createElement('textarea');
   el.value = output_text.replace(/<br>/g, '\n');
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   el.select();
   document.execCommand('copy');
   document.body.removeChild(el);
}
