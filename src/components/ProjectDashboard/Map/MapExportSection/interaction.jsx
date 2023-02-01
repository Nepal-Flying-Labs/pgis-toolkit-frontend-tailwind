/* eslint-disable no-param-reassign */
import interact from '@interactjs/interactjs';

const dragMoveListener = ({ target, dx, dy }) => {
  // keep the dragged position in the data-x/data-y attributes
  const x = (parseFloat(target.getAttribute('data-x')) || 0) + dx;
  const y = (parseFloat(target.getAttribute('data-y')) || 0) + dy;

  // translate the element
  target.style.transform = `translate(${x}px, ${y}px)`;

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
};

export const drag = () => {
  interact('.draggable').draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true,
      }),
    ],
    autoScroll: true,
    listeners: { move: dragMoveListener },
  });
};

export const resize = () => {
  interact('.resizable').resizable({
    // resize from all edges and corners
    edges: { left: false, right: true, bottom: true, top: false },

    listeners: {
      move({ target, rect, deltaRect }) {
        let x = parseFloat(target.getAttribute('data-x')) || 0;
        let y = parseFloat(target.getAttribute('data-y')) || 0;

        // update the element's style
        target.style.width = `${rect.width}px`;
        target.style.height = `${rect.height}px`;

        // translate when resizing from top or left edges
        x += deltaRect.left;
        y += deltaRect.top;

        target.style.transform = `translate(${x}px, ${y}px)`;

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      },
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent',
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 },
      }),
    ],

    inertia: true,
  });
};

export const resizeDrag = () => {
  interact('.resize-drag')
    .resizable({
      // resize from all edges and corners
      edges: { left: false, right: true, bottom: true, top: false },

      listeners: {
        move({ target, rect, deltaRect }) {
          let x = parseFloat(target.getAttribute('data-x')) || 0;
          let y = parseFloat(target.getAttribute('data-y')) || 0;

          // update the element's style
          target.style.width = `${rect.width}px`;
          target.style.height = `${rect.height}px`;

          // translate when resizing from top or left edges
          x += deltaRect.left;
          y += deltaRect.top;

          target.style.transform = `translate(${x}px, ${y}px)`;

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
        },
      },
      modifiers: [
        // keep the edges inside the parent
        interact.modifiers.restrictEdges({
          outer: 'parent',
        }),

        // minimum size
        interact.modifiers.restrictSize({
          min: { width: 50, height: 50 },
        }),
      ],

      inertia: true,
    })
    .draggable({
      listeners: { move: dragMoveListener },
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true,
        }),
      ],
    });
};
