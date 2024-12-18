import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {  
  const [selectedImages, setSelectedImages] = useState([]);
  const [screen, setScreen] = useState(1); 
  const [successfulCombination, setSuccessfulCombination] = useState(null);
  const [gameOver, setGameOver] = useState(false); 
  const [imageSize, setImageSize] = useState("normal"); 
  const [isPaused, setIsPaused] = useState(false); 
  const [showResult, setShowResult] = useState(false); 

  const imagesGrilla1 = [
    'circle.png', 'diamond.png', 'heart.png', 
    'hexagon.png', 'pentagon.png', 'rectangle.png',
    'star.png', 'triangle.png', 'square.png'
  ];

  const imagesGrilla2 = [
    'bird.png', 'cat.png', 'cow.png',
    'dog.png', 'fish.png', 'horse.png',
    'pig.png', 'rabbit.png', 'sheep.png'
  ];

  const imagesGrilla3 = [
    'ball.png', 'baloon.png', 'book.png', 
    'car.png', 'chair.png', 'flower.png',
    'house.png', 'plane.png', 'tree.png'
  ];

  const validCombinations = [    
    [0, 1, 2],  
    [3, 4, 5],  
    [6, 7, 8]
  ];

  const handleSelectImage = (image, index) => {
    const newSelectedImages = [...selectedImages, { image, index }];
    setSelectedImages(newSelectedImages);

    // Si estamos en la tercera pantalla, verificamos la combinación
    if (screen === 3 && newSelectedImages.length === 3) {
      const combination = newSelectedImages.map(item => item.index);
      checkCombination(combination);
      setGameOver(true); // Termina el juego al seleccionar la tercera imagen
    }

    // Avanzar a la siguiente pantalla si no se ha llegado a la tercera pantalla
    if (screen < 3 && !gameOver) {
      setScreen(screen + 1);
    }
  };

  const checkCombination = (combination) => {
    for (let validCombo of validCombinations) {
      if (JSON.stringify(validCombo) === JSON.stringify(combination)) {
        setSuccessfulCombination(true);
        return;
      }
    }
    setSuccessfulCombination(false);
  };

  useEffect(() => {
    if (gameOver) {
      setIsPaused(true); 

      setTimeout(() => {
        setIsPaused(false);
        setShowResult(true); 
      }, 1000);
    }
  }, [gameOver]);

  const resetGame = () => {
    setSelectedImages([]);
    setScreen(1);
    setSuccessfulCombination(null);
    setGameOver(false);
    setImageSize("normal");
    setIsPaused(false);
    setShowResult(false); 
  };

  const renderGrilla = (grilla, grillaNumber) => {
    return grilla.map((image, index) => (
      <div key={index} className="image-item">
        <img
          src={`./download/images/${image}`} // Cambio aquí para la nueva ruta
          alt={image}
          onClick={() => handleSelectImage(image, index)}
          className="image-button"
        />
      </div>
    ));
  };

  return (
    <div className="game-container">
      {gameOver ? (
        <>
          <div className="grilla">
            <div className="grilla-row">
              {isPaused ? (
                <div>
                  <div className="rectangular-container">
                    {selectedImages.map((item, index) => (
                      <div key={index} className="image-item">
                        <img
                          key={index}
                          src={`./download/images/${item.image}`} // Cambio aquí para la nueva ruta
                          alt={item.image}
                          className="selected-image"
                        />
                        <a 
                          href={`./download/images/${item.image}`} 
                          download
                          className="download-link"
                        >
                          Descargar
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className="grilla-container">
                    {imagesGrilla3.map((image, index) => (
                      <div key={index} className="image-item">
                        <img
                          src={`./download/images/${image}`} // Cambio aquí para la nueva ruta
                          alt={image}
                          className="image-button"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="result-container">
                  <div className="grilla-container">
                    {selectedImages.map((item, index) => (
                      <div key={index} className="image-item">
                        <img
                          src={`./download/images/${item.image}`} // Cambio aquí para la nueva ruta
                          alt={item.image}
                          className="image-button"
                        />
                        <a 
                          href={`./download/images/${item.image}`} 
                          download
                          className="download-link"
                        >
                          Descargar
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="message">
                    {successfulCombination ? (
                      <h2>¡Combinación exitosa!</h2>
                    ) : (
                      <h2>Combinación incorrecta</h2>
                    )}

                    <button
                      className={successfulCombination ? 'success-button' : 'failure-button'}
                      onClick={resetGame}
                    >
                      Volver
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="rectangular-container">
            {screen === 1 && !gameOver && (
              <div className="title">
                <text className="cup-text">🏆</text>
                <h2 className="title-text">Decifra tu acertijo y gana!</h2>                
              </div>
            )}

            {screen > 1 && !gameOver && (
              <div className="selected-images">
                {selectedImages.map((item, index) => (
                  <img key={index} src={`./download/images/${item.image}`} alt={item.image} className={`selected-image ${imageSize === "small" ? "small" : ""}`} />
                ))}
              </div>
            )}
          </div>

          {screen === 1 && !gameOver && (
            <div className="grilla">
              <div className="grilla-row">
                {renderGrilla(imagesGrilla1.slice(0, 3), 1)}
              </div>
              <div className="grilla-row">
                {renderGrilla(imagesGrilla1.slice(3, 6), 1)}
              </div>
              <div className="grilla-row">
                {renderGrilla(imagesGrilla1.slice(6, 9), 1)}
              </div>
            </div>
          )}

          {screen === 2 && !gameOver && (
            <div className="grilla">
              <div className="grilla-row">
                {renderGrilla(imagesGrilla2.slice(0, 3), 2)}
              </div>
              <div className="grilla-row">
                {renderGrilla(imagesGrilla2.slice(3, 6), 2)}
              </div>
              <div className="grilla-row">
                {renderGrilla(imagesGrilla2.slice(6, 9), 2)}
              </div>
            </div>
          )}

          {screen === 3 && !gameOver && (
            <div className="grilla">
              <div className="grilla-row">
                {renderGrilla(imagesGrilla3.slice(0, 3), 3)}
              </div>
              <div className="grilla-row">
                {renderGrilla(imagesGrilla3.slice(3, 6), 3)}
              </div>
              <div className="grilla-row">
                {renderGrilla(imagesGrilla3.slice(6, 9), 3)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
