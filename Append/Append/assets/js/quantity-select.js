// This script replaces number inputs with select dropdowns for vehicle quantity fields
// so users can only select a value from 0 to 60 (no typing)
document.addEventListener('DOMContentLoaded', function() {
  const qtyFields = [
    'sedan-qty',
    'suv-qty',
    'pickup-qty',
    'van-qty',
    'semi-qty',
    'box-qty'
  ];

  qtyFields.forEach(function(name) {
    const input = document.querySelector(`input[name="${name}"]`);
    if (input) {
      // Create select element
      const select = document.createElement('select');
      select.name = input.name;
      select.className = (input.className + ' vehicle-qty-select').trim();
      for (let i = 0; i <= 60; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (parseInt(input.value) === i) option.selected = true;
        select.appendChild(option);
      }
      // Replace input with select
      input.parentNode.replaceChild(select, input);
    }
  });
});
