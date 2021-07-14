
/** 
 * Recebe a data no formato dd/mm/YYYY e verifica de é uma data valida
 * exemplo 10/10/2020
 * Opcional hora e minuto
 * @param {string} dataBr 
 * @param {string} hora 
 * @param {string} minuto 
 * @returns 
 */
function validaDataBr(dataBr, hora = "00", minuto = "00") {

  if (parseInt(hora) > 23 || parseInt(hora) < 0) {
    return false;
  }

  if (parseInt(minuto) > 59 || parseInt(minuto) < 0) {
    return false;
  }

  const isoData = dataBr.split("/").reverse().join('-') + 'T00:00:00';

  try {
    const novaData = new Date(isoData);
    const novoDia = novaData.getDate().toString().padStart(2, "0");
    const novoMes = (novaData.getMonth() + 1).toString().padStart(2, "0");
    const novoAno = novaData.getFullYear().toString();
    const novaDataFormatada = `${novoDia}/${novoMes}/${novoAno}`;
    if (novaDataFormatada !== dataBr) {
      throw new Error('data invalida');
    }
  } catch (error) {
    return false;
  }

  return true;
}


/**
 * faz o comparativo entre as datas retornado o status de acordo com a comparação
 * 
 * status = 1: d2 > d1 | 0: d1 == d2 | -1: d1 > d2
 * 
 * @param {string} data1 
 * @param {string} data2 
 * @returns {integer} 
 */

function compararDatasBr(data1, data2) {

  if (!data1 || !data2) {
    throw new Error('Deve ser informado 2 datas');
  }

  let status = 0;
  try {
    const d1 = new Date(toISOFormat(data1)).getTime();
    const d2 = new Date(toISOFormat(data2)).getTime();

    if (d1 === d2) {
      status = 0;
    } else if (d1 < d2) {
      status = 1;
    } else {
      status = -1;
    }

  } catch (error) {
    throw new Error('impossivel de comparar');
  }

  return status
}

/** 
 * recebe a data no formato dd/mm/YYYY HH:mm 
 * exemplo 10/10/2020 23:55 * 
 * @param {string} dateTimeString 
 * @returns {string} 
 */
function toISOFormat(dateTimeString) {
  const [date, time] = dateTimeString.split(' ');
  const [DD, MM, YYYY] = date.split('/');
  const [HH, mm] = time.split(':');
  return `${YYYY}-${MM}-${DD}T${HH}:${mm}`;
}