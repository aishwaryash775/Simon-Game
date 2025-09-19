const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottonLeft = document.querySelector(
    '.bottom-left-panel'
);
const bottonRight = document.querySelector(
    '.bottom-right-panel'
);

const getRandomPanel = () =>{        
     const panels = [
        topLeft,
        topRight,
        bottonLeft,
        bottonRight     
        ];
        
        return panels[parseInt(Math.random() *  panels.length)];

    };

const sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence];

const flash = panel => {
    return new Promise(resolve => {
        panel.className += ' active';
        setTimeout(() => {
                panel.className = panel.className.replace(
                        'active',
                         ''

                );
                setTimeout(() =>{
                    resolve();
                },250);
        }, 1000);
    });
}; 

let canClick = false;

   const panelClicked = panelClicked => {
  if (!canClick) return;
  const expectedPanel = sequenceToGuess.shift();
  if (expectedPanel === panelClicked) {
    if (sequenceToGuess.length === 0) {
      // start new round
      sequence.push(getRandomPanel());
      sequenceToGuess = [...sequence];
      startFlashing();
    }
  } else {
    // end game
    alert('game over');
  }
};
const startFlashing = async () => {
  canClick = false;
  for (const panel of sequence) {
    await flash(panel);
  }
  canClick = true;
};

startFlashing();
