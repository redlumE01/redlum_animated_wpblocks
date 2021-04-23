import assign from 'lodash.assign';
import {animationLabels} from './animation_labels';
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, SelectControl } = wp.components;

const animationClasses = animationLabels,
animationClassesSplit = animationClasses.split(',');

const animationOptions = [
  {
    label: __( 'None', 'redlumAnimatedBlocksTrans'),
    value: 'none',
  }
];

for (const el of animationClassesSplit){

  let object = {
    label: el,
    value: el
  };

  {animationOptions.push(object);}

}

const addAnimationControlAttribute = ( settings, name ) => {

  settings.attributes = assign( settings.attributes, {
    animationType: {
      type: 'string',
      default: animationOptions[0].value,
    },
  } );

  return settings;

};

addFilter( 'blocks.registerBlockType', 'redlum_animated_blocks', addAnimationControlAttribute );

function addCustomAttributes( settings, name ) {
  if ( settings.attributes ) {

    settings.attributes.customAttribute = {
      type: 'string',
      default: ''
    };

  }
  return settings;
}

addFilter( 'blocks.registerBlockType', 'redlum_animated_blocks', addCustomAttributes );

function applyExtraClass( extraProps, blockType, attributes ) {

  const { customAttribute } = attributes;

  if (customAttribute ) {
    assign(extraProps, {
      'animation-data': customAttribute
    });
  }

  return extraProps;
}

addFilter('blocks.getSaveContent.extraProps', 'redlum_animated_blocks',applyExtraClass);

const withSpacingControl = createHigherOrderComponent( ( BlockEdit ) => {

  return ( props ) => {

    const { customAttribute } = props.attributes;

    return (
      <Fragment>
        <BlockEdit { ...props } />
        <InspectorControls>
          <PanelBody title={ __( 'Animation setting','redlumAnimatedBlocksTrans') } initialOpen={ false } >
            <SelectControl
              label={ __( 'Animation type','redlumAnimatedBlocksTrans') }
              value={ customAttribute }
              options={ animationOptions }
              onChange={ ( selectedSpacingOption ) => {
                const selected = document.querySelector('.is-selected');
                selected.classList.add('animated');
                selected.classList.toggle(selectedSpacingOption);

                setTimeout(()=> {
                  const lastClass = selected.classList.length - 1,
                    secondLastClass = selected.classList.length - 2;
                    selected.classList.remove(selected.classList[lastClass]);
                    selected.classList.remove(selected.classList[secondLastClass]);
                }, 2000);

                props.setAttributes({
                  customAttribute: selectedSpacingOption,
                });

              } }
            />
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  };
}, 'withSpacingControl' );

addFilter( 'editor.BlockEdit', 'extend-block-example/with-spacing-control', withSpacingControl );
