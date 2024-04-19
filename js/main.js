document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

  const userName = document.querySelector("#userName").value;
  const res = await fetch(`/api?student=${userName}`)
  const data = await res.json()

  console.log(data);
  document.querySelector("#answer").textContent = data.response;
  const audio = new Audio(data.audioResponse);
  audio.play();
  //document.querySelector("#personName").textContent = data.name
  //document.querySelector("#personStatus").textContent = data.status
  //document.querySelector("#personOccupation").textContent = data.currentOccupation
}