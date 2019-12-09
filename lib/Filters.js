function currencyFilter(value) {
    if (!value && value !== 0) {
        return;
    }

    value = parseFloat(value);

    value = value.toFixed(2);

    const hasDecimal = value.toString().indexOf(".") >= 0;

    let result = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "ponto");

    if (hasDecimal) {
        result = result.replace(".", ',');
    } else {
        result += ",00";
    }

    return result = result.replace("ponto", '.');
}