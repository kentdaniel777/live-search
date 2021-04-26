const source = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities=[]

fetch(source)// returns a promise
  .then(response => response.json())// is another promise
  .then(data => cities.push(...data));// ... for unpack

function Search(name){
    name= name.replace(/\s/g, '');
    const highlight=[]
    const regex = new RegExp(name,"gi");// g for globals ( search all , i for case-insensitive)

    const res =cities.filter((c)=> {
        const result  =c.city.match(regex) || c.city.match(regex);

        if (result){
            highlight.push(result);
        }
        return result;
    });
    
    for (i=0;i<res.length;i++){

        res[i]["highlight"]=highlight[i];
    }

    return res;
}

function highlight(text,tag) {
    return tag.innerHTML.replaceAll(
       text,
        '<span class="highlight">$&</span>'
    );
}
// highlight("o");
function display(result){
    const lists=document.querySelector(".suggestions");
    while (lists.firstChild) {// remove all text first 
        lists.removeChild(lists.lastChild);
      }
    if (result.length>0){

        result.filter((place)=>{
                    // create the main list
                    
                    let parent = document.createElement("li");
                    const node=document.createTextNode(`${place["city"]},${place["state"]}`);
                    parent.appendChild(node)
                    parent.innerHTML = highlight(place["highlight"],parent);
                    lists.appendChild(parent)

                }
        )
    }else{

        const parent = document.createElement("li");
        const node=document.createTextNode("result not found");
        parent.appendChild(node)
        lists.appendChild(parent)
    }
    
    
}


const input=document.querySelector(".search");
input.addEventListener("change",function(){

    if (input.value!= ""){
        const matches=Search(input.value);

        display(matches)
    }
})
input.addEventListener("keyup",function(){

    if (input.value!= ""){
        const matches=Search(input.value);
        display(matches)
    }
    
    
})




// const result=document.querySelector("li");
// result.addEventListener("click",()=>{
//     console.log(result);
// });

