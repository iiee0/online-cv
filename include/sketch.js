let bf_url = "https://coolors.co/f72585-b5179e-7209b7-560bad-480ca8-3a0ca3-3f37c9-4361ee-4895ef-4cc9f0";
bf_url = bf_url.split("/");
let url = bf_url[3];
//nsole.log(url);



let color_cd = [];


console.log(bf_url);
let new_color = bf_url[3].split("-");

let result_color =  "";
                            
//conle.log(new_color.length);

for(let i = 0; i < new_color.length; i++){
 // console.log(colors[0]);
   color_cd[i] = "#" + new_color[i];

  
}

console.log(color_cd);

function setup() {
  createCanvas(1000, 1000);
  
  
  
}

function draw() {
    background("#5BB66F");
  
  
    
  let c = random(color_cd);
  fill(c);
  ellipse(100,100,100,100);

}
