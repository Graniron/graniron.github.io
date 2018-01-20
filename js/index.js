const imgs = document.querySelectorAll('img');
const imgsArr = [...imgs];

const timings = {
  duration: 2000,
  fill: 'forwards'
};
const kEffects = [];
let animation;

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getFrames() {
  return [
    { 
      opacity: 0, 
      transform: `rotate(${getRandom(-12, 12)}deg) scale(1.2)`, 
      boxShadow: '0 0 12px 12px rgba(0,0,0,.3)' 
    }, 
    { 
      opacity: 1, 
      transform: `rotate(${getRandom(-8, 8)}deg)`, 
      boxShadow: '0 0 6px 6px rgba(0,0,0,.3)'  
    }
  ];
}

function slideshow() {
  imgsArr.forEach((img, i) => {
      img.style.position = "absolute";
      img.style.width = getRandom(33,45)+"%";
      img.style.left = getRandom(-5,65)+"%";
      img.style.top = getRandom(-6,60)+"vh";
      
      kEffects.push(
        new KeyframeEffect(img, getFrames(), timings)
      ) 
  });

  const group = new SequenceEffect(kEffects);
  // const group = new GroupEffect(kEffects);

  animation = document.timeline.play(group);
  animation.pause();
  animation.onfinish = resetOnFinish;
}


window.addEventListener('load', function() {
  // after all 'imgs' loaded invoke callback 'slideshow'
  imagesLoaded(imgs, slideshow);
})


// Animations controls
function togglePlay() {
  if (animation.playState === 'running') {
    animation.pause();
  } else {
    animation.play();
  }
}

function reverse() {
  animation.reverse();  
}

function resetOnFinish() {
  animation.playbackRate = 1;
  animation.pause();
}


