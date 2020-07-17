#Redlum Animated WP-blocks

Redlum Animated Blocks is a Wordpress plugin for adding the option of animation for every Guteberg block.
The animations are provided by animate.css (https://animate.style/).

##Features

###Back-end

#####Preview:
In the back-end you will be able to preview the selected animation inside of the Gutenberg editor.
After a timeout, the animation will reset.

#####Saving:
The selected animation will be saved in a html data attribute on blocks.getSaveContent.extraProps.

####Front-end
All animations in the front-end are triggered & checked by Javascript. Html data attributes values will be inserted in the class of the object.
Animations that are visible in the viewport will be triggered immediately, others will wait for full visibility within the viewport.

####Considerations
With specific animations e.g FadeOutRight, FadeOutRight the animated element will remain in the DOM after the animation is completed.
Preventing undesirable styling issues can be achieved by using overflow:hidden on the body or html tag. 
