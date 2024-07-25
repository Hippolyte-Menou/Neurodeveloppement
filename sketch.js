// Global variables
let age // This will hold the age object
let max_month = 36 // Maximum age in months // TODO 72 (in separate windows)

let dragging = false // Indicates if the age slider is being dragged.
let age_pressed = false // Indicates if the age slider is being pressed

let milestones // JSON data for milestones
let panels = [] // Array to hold panel objects

let paragraph // Paragraph describing the neurodeveloppement
let padding_right = 80  // Padding to the right of the 
let start_y  // Top of the canvas (150)

let dvlp_normal  // TODO
let dvlp_dyn  // html element holding the developpement paragraph
let dlvp_basic  // TODO

// Colors for different categories
let colours = {"Motricité Globale": "#7BD3EA", 
               "Motricité Fine": "#A1EEBD",
               "Langage": "#F6F7C4",
               "Contact Social": "#F6D6D6"}

// Preload milestones JSON files
function preload() {
  milestones = loadJSON('milestones.json')
  milestones_phrases = loadJSON("milestones_phrases.json")
}

function setup() {
  let canvas = createCanvas(800, 2200)
  canvas.parent("sketch-holder") // Sketch name
  canvas.position(0,150) // Sketch position 
  background(255)
  
  age = new Age(16) // default age
  
  // Create panels for each category
  for (let i in milestones){
    panels.push(new Panel(i, colours[i], milestones[i]))
  }
  
  // Create text copy button. Text to clipboard
  copy_button = createButton('Copier')
  copy_button.position(1300, 140)
  copy_button.size(200)
  copy_button.mousePressed(copyStringToClipboard)
  
  // Create checkbox for including age in text
  checkbox = createCheckbox("Avec l'âge")
  checkbox.position(1100, 145)

  // Create input for pronoun or firstname with a random name
  pro_nom = createInput(['il', 'elle', 'Elsa', 'Emma', 'Jade', 'Léo', 'Gabriel', 'Raphaël'][Math.floor(Math.random() * 8)])
  pro_nom.position(865, 145)
  
  // Create dynamic development paragraph
  dvlp_dyn = createP("Concernant le développement psychomoteur,")
  dvlp_dyn.position(850, 150)
  dvlp_dyn.style("padding", "15px")
  }

function draw() {
  background(255)
  age.update()
  draw_panels()
  draw_reset_button()
  dvlp_dyn.html(get_dyn_dvlp())
}

function draw_panels(){
  start_y = 150
  for (let panel in panels) {
    panels[panel].update(start_y)
    start_y = start_y + panels[panel].mstones_to_show.length * 30 + 50
  }  
}

function draw_reset_button(){
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
    // In age sliding cursor
    age_pressed = true
  }
  if (mouseX >= 125 - 100/2 && mouseX <= 125 + 100/2 && mouseY >= start_y - 30/2 && mouseY <= start_y + 30/2) { 
    // In reset button
    reset_dvlp()
  }
  
  // Iterate through milestones
  for (let i in panels){
    for (let j in panels[i].milestones){
      m = panels[i].milestones[j]
      if (panels[i].mstones_to_show.includes(m)){
        // Milestone is displayed on screen
        if (mouseX >= m.min_x && mouseX <= m.max_x && mouseY >= m.y_pos-12 && mouseY <= m.y_pos+12){
          // In milestone box
          m.toggle() // Toggle milestone
          }
      }
    }
  }
}

function mouseDragged() {
  if (age_pressed) {
    mouse_x = constrain(mouseX, 80, width-padding_right)
    new_age = map(mouse_x, 80, width-padding_right, 0, max_month)
    new_age = Math.round(new_age)
    age.months = new_age
  }
}

function mouseReleased(){
  age_pressed = false
}

// Get dynamic development text function
function get_dyn_dvlp(){
  let pro_nom_txt = pro_nom.value()
  let Pro_nom_txt = pro_nom_txt.length === 0 ? pro_nom_txt : pro_nom_txt.charAt(0).toUpperCase() + pro_nom_txt.slice(1).toLowerCase()
  let to_sentence = {"Motricité Globale": "Sur le plan de la motricité globale, ", "Motricité Fine": "Sur le plan de la motricité fine, ", "Langage": "Sur le plan du langage, ", "Contact Social": "Sur le plan du contact social, "}
  paragraph = `Concernant le  developpement psychomoteur de l'enfant ... évalué(e) à un âge de ${age.texte} :<br>`
  paragraph += `<br>${Pro_nom_txt} a marché à ... mois, dit ses premiers mots (autre que papa/mama) à l'âge de ..., dit une phrase à ... ans<br>`
  for (let i in panels){
     paragraph += `<br>${to_sentence[panels[i].title]}${pro_nom_txt} `
    for (let j in panels[i].milestones){
      m = panels[i].milestones[j]
      if (m.toggled == 1){ // Item est selectionnée
        if (checkbox.checked()) {
          paragraph += `${milestones_phrases[panels[i].title][m.display_name][1]}, ` // Item est acquis avec âge
        } else {
          paragraph += `${milestones_phrases[panels[i].title][m.display_name][0]}, ` // Item est acquis
        }
          }
        }
    for (let j in panels[i].milestones){
      m = panels[i].milestones[j]
      if (m.toggled == 2){
        paragraph += `${milestones_phrases[panels[i].title][m.display_name][2]}, ` // Item est non acquis
          }
        }
    }
  return paragraph.replace(', <br>', '.<br>') // Add . at the end of each sentences
}

// Display developpement text
function write_text(h){
  push()
  textAlign(LEFT, CENTER)
  text(paragraph, 80, h + 20)
  pop()
}

/* 
function keyPressed() {
  if (key === 'c') {
    copyStringToClipboard (paragraph)
  }
} */

// Reset button pressed : toggle off all milestones
function reset_dvlp(){
  for (let i in panels){
    for (let j in panels[i].milestones){
      m = panels[i].milestones[j]
      m.toggled = false
        }
    }
}

function copyStringToClipboard(str) {
   var el = document.createElement('textarea')
   el.value = paragraph.replace(/<br>/g, '\n')
   el.setAttribute('readonly', '')
   el.style = {position: 'absolute', left: '-9999px'}
   document.body.appendChild(el)
   el.select()
   document.execCommand('copy')
   document.body.removeChild(el)
}
