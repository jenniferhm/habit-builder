import anime from 'animejs';

const createOpacityAnimationConfig = (animatingIn) => ({
  value: animatingIn ? [0, 1] : 0,
  easing: 'linear',
  duration: 300
})

const easing = 'spring(1, 150, 10)'

/**
 * Animates cards left to right and right to left
 * @param card - HTML element targets to animate
 * @param i Index number, will be used to determine which direction and delays 
 */
const animateCardIn = (card, i) =>
  anime({
    targets: card,
    opacity: createOpacityAnimationConfig(true),
    easing,
    translateY: [2000, 0],
    rotate: [-3600, 3600],
    scale: [0, 1], 
    delay: 200 * i,
})

export default animateCardIn;