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

  /*const validCombinations = [
    [3, 0, 2]
  ];*/

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
      //setImageSize("small"); // Reducir el tamaño de las imágenes seleccionadas al agregar la tercera imagen
      setIsPaused(true); // Iniciar la pausa antes de mostrar el resultado

      // Pausar antes de mostrar el resultado
      setTimeout(() => {
        setIsPaused(false);
        setShowResult(true); // Mostrar el resultado después de la pausa
      }, 1000); // 1 segundo de pausa
    }
  }, [gameOver]);

  const resetGame = () => {
    // Resetear todo el estado para comenzar el juego nuevamente
    setSelectedImages([]);
    setScreen(1);
    setSuccessfulCombination(null);
    setGameOver(false);
    setImageSize("normal");
    setIsPaused(false);
    setShowResult(false); // Resetear el resultado
  };

  const renderGrilla = (grilla, grillaNumber) => {
    return grilla.map((image, index) => (
      <div key={index} className="image-item">
        <img
          src={`./images/${image}`}
          alt={image}
          onClick={() => handleSelectImage(image, index)}
          className="image-button"
        />
      </div>
    ));
  };

  return (
    <div className="game-container">
      {/* Si el juego ha terminado, eliminamos el rectángulo gris y mostramos las imágenes seleccionadas */}
      {gameOver ? (
        <>
          <div className="grilla">
            <div className="grilla-row">
              {/* Pausa de 1 segundo y mostramos las imágenes centradas */}              
              {/* Pausa de 1 segundo y mostramos las imágenes centradas */}
              {isPaused ? (
                <div>
                  {/* Mostrar rectángulo con las imágenes seleccionadas */}
                  <div className="rectangular-container">
                    {selectedImages.map((item, index) => (
                      <img
                        key={index}
                        src={`./images/${item.image}`}
                        alt={item.image}
                        className={`selected-image`}
                      />
                    ))}
                  </div>

                  {/* Mostrar la grilla de 3x3 junto al rectángulo durante la pausa */}
                  <div className="grilla-container">
                    {imagesGrilla3.map((image, index) => (
                      <div key={index} className="image-item">
                        <img
                          src={`./images/${image}`}
                          alt={image}
                          className="image-button"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Aquí mostramos el resultado después de la pausa de 1 segundo
                <div className="result-container">
                  <div className="grilla-container">
                    {/* Mostrar las imágenes seleccionadas en la fila de 3x1 */}
                    {selectedImages.map((item, index) => (
                      <div key={index} className="image-item">
                        <img
                          src={`./images/${item.image}`}
                          alt={item.image}
                          className="image-button"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Mostrar el mensaje de éxito o fracaso */}
                  <div className="message">
                    {successfulCombination ? (
                      <h2>¡Combinación exitosa!</h2>
                    ) : (
                      <h2>Combinación incorrecta</h2>
                    )}

                    {/* Botón de resultado */}
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
          {/* Contenedor gris alrededor del texto y la grilla 3x1 */}
          <div className="rectangular-container">
            {screen === 1 && !gameOver && (
              <div className="title">
                <text className="cup-text">🏆</text>
                <h2 className="title-text">Decifra tu acertijo y gana!</h2>                
              </div>
            )}

            {/* Grilla 1x3 (de imágenes seleccionadas) dentro del rectángulo */}
            {screen > 1 && !gameOver && (
              <div className="selected-images">
                {selectedImages.map((item, index) => (
                  <img key={index} src={`./images/${item.image}`} alt={item.image} className={`selected-image ${imageSize === "small" ? "small" : ""}`} />
                ))}
              </div>
            )}
          </div>

          {/* Grilla 3x3 con imágenes grandes */}
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

          {/* Grilla 3x3 (segunda pantalla) */}
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

          {/* Grilla 3x3 (tercera pantalla) */}
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
