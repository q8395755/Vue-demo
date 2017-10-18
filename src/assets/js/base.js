const base = base || {};

function PeiSongAnimate(StartElement,AnimateElement,fangxiang,num){
    var oString = 'translate' + fangxiang + '(' + num +'px)';
    console.log(StartElement);
    StartElement.addEventListener('touchstart',function(e){
        //解决点透
        e.preventDefault();
        AnimateElement.style.transition = ' .5s all';
        AnimateElement.style.transform = oString;

    })
} 
base.PeiSongAnimate = PeiSongAnimate;
export default base  