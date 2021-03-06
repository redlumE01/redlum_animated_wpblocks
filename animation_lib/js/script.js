import {preHiddenAnimationClasses} from './../../src/animation_labels';

// ViewPort check function
function elementInViewport(myElement) {
  let bounding = myElement.getBoundingClientRect(), specialClasses = preHiddenAnimationClasses;
  // in Viewport
  if (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)){

    myElement.classList.add('animated',myElement.getAttribute('animation-data'));
    if (myElement.classList.contains('animation-hidden')){
      myElement.classList.remove('animation-hidden');
    }

    myElement.removeAttribute("animation-data");

  }
  else{
    const arrContainString = (specialClasses.indexOf(myElement.getAttribute("animation-data")) > -1);
     arrContainString ? myElement.classList.add('animation-hidden') : null;
  }

}

function runAnimation(){
  const allAnimatedObjects = document.querySelectorAll('[animation-data]');
  for (let el of allAnimatedObjects){
    elementInViewport(el);
  }
}

document.addEventListener("DOMContentLoaded", function(){
  runAnimation();
  document.addEventListener("scroll", () => runAnimation())
});


