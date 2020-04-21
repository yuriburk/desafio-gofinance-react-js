const formatValue = (value: number | undefined): string =>
  value
    ? Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        value,
      )
    : 'R$ 0';

export default formatValue;
