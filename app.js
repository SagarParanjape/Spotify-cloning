let cd = document.getElementsByClassName("card");
let x = Array.from(cd);
let play = document.getElementsByClassName("play-section")[0];
x.map(m => {
  m.addEventListener("click", () => {
    play.style.display = "block";
    play.style.position = "absolute";
    play.style.bottom = "71px";
    console.log("hi");
  });
});

let btn3 = document.getElementsByClassName("button-3")[0];
let btn6 = document.getElementsByClassName("button-6")[0];
btn3.addEventListener("click", () => {
  btn3.style.display = "none";
  btn6.style.display = "block";
});
btn6.addEventListener("click", () => {
  btn6.style.display = "none";
  btn3.style.display = "block";
});

const clientId = "d2728f2995374c0bab2d085003d0915b";
const clientSecret = "027d6c6706d84588825b101d29e17a5d";
let i = 0;
let s;
let z = 0;
const getToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  console.log(data);
  const accessToken = data.access_token;
  console.log(accessToken);
  const artistId = "1mYsTxnqsietFxj1OgoGbG";
  fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .then(data =>
      data.tracks.map(m => {
        let data = JSON.stringify(m);
        console.log(data);
        console.log(m.name);

        localStorage.setItem(`spotifydata${i}`, data);

        let data1 = localStorage.getItem(`spotifydata${i}`);
        console.log(data1);
        i++;
        let data2 = JSON.parse(data1);
        // console.log(data2.preview_url);
        console.log(data2.album.images[0].url);
        console.log(data2);

        let img = document.getElementsByClassName("card-con")[0];
        img.innerHTML += `<figure><img src="${data2.album.images[0].url}" id="imgg"></img>
        <br>
        <audio src="${data2.preview_url}" controls></audio></figure>`;
        // console.log(img);
        let x = document.getElementsByTagName("figure");
        let y = Array.from(x);
        console.log(y);
        y.map((m, v) => {
          // console.log(m);
          let url_audio = m.children[2].getAttribute("src");
          // console.log(url_audio);
          // console.log(m.children[2]);
          m.addEventListener("click", e => {
            e.preventDefault();
            console.log(m);
            // console.log(m.innerHTML);
            let au = document.getElementsByClassName("footer-dis")[0];
            // console.log(au);
            // let bb = [];
            au.innerHTML = `<figure class="footer-dis "><img id="pic" src="${m.children[0].getAttribute(
              "src"
            )}" style="display:block;"></figure>
            <audio style="display:none;" src="${url_audio}" controls autoplay id="audio_"></audio>
                
                  <article id="footer-art">
        <button class="btn first"><i class="fa-solid fa-backward"></i></button>
        <button class="btn second"><i class="fa-solid fa-pause"></i></button>
        <button class="btn pause" style="display:none;"><i class="fa-solid fa-play"></i></button>
        <button class="btn third"><i class="fa-solid fa-forward"></i></button>
        <button class="btn repeat"><i class="fa-solid fa-repeat"></i></button>
      </article>
                  

                    
            `;
            //forward button start
            let playBtn = document.getElementsByClassName("second")[0];
            let pauseBtn = document.getElementsByClassName("pause")[0];
            let audio = document.getElementById("audio_");
            let backwardBtn = document.getElementsByClassName("first")[0];
            let forward = document.getElementsByClassName("third")[0];
            let pic = document.getElementById("pic");
            let repeat = document.getElementsByClassName("repeat")[0];
            console.log(repeat);
            console.log(forward);
            forward.addEventListener("click", e => {
              if (v < localStorage.length - 1) {
                v++;
                s = localStorage.getItem(`spotifydata${v}`);

                let parse = JSON.parse(s);
                // console.log(parse);
                let c = parse.preview_url;
                let imga = parse.album.images[0].url;
                pic.setAttribute("src", `${imga}`);

                audio.setAttribute("src", `${c}`);
              } else {
                v = 0;
                s = localStorage.getItem(`spotifydata${v}`);

                let parse = JSON.parse(s);
                // console.log(parse);
                let c = parse.preview_url;
                let imga = parse.album.images[0].url;
                pic.setAttribute("src", `${imga}`);

                audio.setAttribute("src", `${c}`);
              }
            });

            //!----backward button start ----------
            backwardBtn.addEventListener("click", e => {
              if (v > 0) {
                v--;
                s = localStorage.getItem(`spotifydata${v}`);

                let parse1 = JSON.parse(s);
                // console.log(parse1);
                let c = parse1.preview_url;
                let imga = parse1.album.images[0].url;
                pic.setAttribute("src", `${imga}`);

                audio.setAttribute("src", `${c}`);
              } else {
                v = localStorage.length - 1;
                s = localStorage.getItem(`spotifydata${v}`);

                let parse1 = JSON.parse(s);
                // console.log(parse1);
                let c = parse1.preview_url;
                let imga = parse1.album.images[0].url;
                pic.setAttribute("src", `${imga}`);

                audio.setAttribute("src", `${c}`);
              }
            });
            //!----backward button end---

            playBtn.addEventListener("click", e => {
              playBtn.style.display = "none";
              pauseBtn.style.display = "block";
              audio.pause();
            });
            pauseBtn.addEventListener("click", e => {
              playBtn.style.display = "block";
              pauseBtn.style.display = "none";
              audio.play();
            });
            // ends here

            //!--reapet start here

            repeat.addEventListener("click", e => {
              for (let i = v; i != 0; ++i) {
                i = v;
                console.log(i);
                console.log(v);
                s = localStorage.getItem(`spotifydata${v}`);
                console.log(v);
                let parse1 = JSON.parse(s);
                // console.log(parse1);
                let c = parse1.preview_url;
                let imga = parse1.album.images[0].url;
                pic.setAttribute("src", `${imga}`);
                audio.setAttribute("src", `${c}`);
              }
            });
            //!--reapet end here
          });
        });
      })
    );
};
getToken();
