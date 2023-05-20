document.addEventListener('DOMContentLoaded', function() {
  const textInput = document.getElementById('textInput');
  const transformedText = document.getElementById('transformedText');
  const transformOptions = document.getElementsByName('transformOption');

  //Para o input
  textInput.addEventListener('input', handleTextTransform);

  //Para transformação
  transformOptions.forEach(function(option) {
    option.addEventListener('change', handleTextTransform);
  });

  // Function to handle text transform
  function handleTextTransform() {
    const selectedOption = document.querySelector('input[name="transformOption"]:checked').value;
    const inputText = textInput.value;
    let transformedValue = '';

    switch (selectedOption) {
      case 'none':
        transformedValue = inputText;
        break;
      case 'capitalize':
        transformedValue = inputText.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
        break;
      case 'uppercase':
        transformedValue = inputText.toUpperCase();
        break;
      case 'lowercase':
        transformedValue = inputText.toLowerCase();
        break;
    }

    transformedText.textContent = transformedValue;
  }
});
