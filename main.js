//TODO add imports if needed
//TODO doc
 const femaleNames = [// konstanta pro pole s ženskými jmény
  "Anna","Marie","Eliška","Adéla","Tereza",
];
const femaleSurnames = [// konstanta pro pole s ženskými příjmeními
  "Nováková", "Svobodová", "Dvořáková", "Horáková", "Pokorná",
];
const maleNames = [// konstanta pro pole s mužskými jmény
  "Jan","Petr","Jiří","Tomáš","Lukáš",
];
const maleSurnames = [// konstanta pro pole s mužskými příjmeními
  "Novák", "Svoboda", "Dvořák", "Horák", "Pokorný",
];
const Workload=[// konstanta pro pole s 4 zadanými pracovními úvazky
  10,20,30,40
];

/**
 * The main function which calls the application. 
 * Funkce main do sebe volá 2 námi vytvořené funkce. jedna pro vytvoření náhodného listu zaměstnanců a druhá která nám vytáhne statistiky z vytvořeného listu zaměstnanců
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {object} containing the statistics
 */
export function main(dtoIn) {
const employees = generateEmployeeData(dtoIn)// volání funkce která nám vytvoří zadaný počet zaměstnanců a jejich data
const statistics = getEmployeeStatistics(employees)//zde voláme funkci která nám z vytvořených dat vytáhne všechny výpočty a statistiky které potřebujeme dle zadání 
let dtoOut = {//vytvoření výsledku hlavní funkce ve formátu dle zadání a následné volání hodnot pomocí konstanty "statistics" ve ktéré jsme předtím zavolali naši funkci
      "total": statistics.total,//přiřazení hodnot z konstanty 
      "workload10": statistics.workload10,//přiřazení hodnot z konstanty 
      "workload20": statistics.workload20,//přiřazení hodnot z konstanty 
      "workload30": statistics.workload30,//přiřazení hodnot z konstanty 
      "workload40": statistics.workload40,//přiřazení hodnot z konstanty 
      "averageAge": statistics.averageAge,//přiřazení hodnot z konstanty 
      "minAge": statistics.minAge,//přiřazení hodnot z konstanty 
      "maxAge": statistics.maxAge,//přiřazení hodnot z konstanty 
      "medianAge":statistics.medianAge,//přiřazení hodnot z konstanty 
      "medianWorkload": statistics.medianWorkload,//přiřazení hodnot z konstanty 
      "averageWomenWorkload": statistics.averageWomenWorkload,//přiřazení hodnot z konstanty 
      "sortedByWorkload":statistics.sortedByWorkload//přiřazení hodnot z konstanty 
}
  return dtoOut;//výsledek funkce main
}

/**
 * Tato funkce slouží por vytvoření seznamu zaměstnanců a jejich dat, vstupem je dtoIn který nám zadává chtěné hranice pro daá data a počet vytvořených zaměstnanců
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */
export function generateEmployeeData(dtoIn) {

function getRandomBirthday(minAge, maxAge) {//funkce pro datum narození

  const now = new Date();

  // nejstarší povolené datum (max age)
  const maxDate = new Date(now);
  maxDate.setFullYear(maxDate.getFullYear() - maxAge);

  // nejmenší povolené datum (min age)
  const minDate = new Date(now);
  minDate.setFullYear(minDate.getFullYear() - minAge);

  // náhodný výběr přesného data mezi zadaným maximem a minimem
  const randomTime = maxDate.getTime() + Math.random() * (minDate.getTime() - maxDate.getTime());

  return new Date(randomTime).toISOString();//funkce vrací náhodné daum ve formátu ISO

};
function randomsex() {//funkce pro náhoné vybrání pohlaví

  return Math.random() < 0.5 ? "male" : "female";//vrací buď "male" nebo "female"

};
function getRandomFromNames(names) {//funkce pro vybrání náhodného jména z pole

  return names[Math.floor(Math.random() * names.length)];// vrací nám přesné nahodnou pozici ve vloženém řetězci podle jeho délky

};
function chooseName(sex) {//funkce pro vybrání jména podle pohlaví

  if (sex==="male"){//podmínka pro mužské
    let randomNames = getRandomFromNames(maleNames);//volání funkce pro vybrání náhodného jména
    return randomNames;//vrací jméno 
  }

  else if (sex==="female"){//podmínka pro ženské
    let randomNames = getRandomFromNames(femaleNames);//volání funkce pro vybrání náhodného jména
    return randomNames;//vrací jméno 
  }

};
function getRandomFromSurnames(surnames) {//funkce pro vybrání náhodného příjmení z pole

  return surnames[Math.floor(Math.random() * surnames.length)];// vrací nám přesné nahodnou pozici ve vloženém řetězci podle jeho délky

};
function chooseSurname(sex) {//funkce pro vybrání příjmení podle pohlaví

  if (sex==="male"){//podmínka pro mužské
    let randomSurname = getRandomFromSurnames(maleSurnames);//volání funkce pro vybrání náhodného příjmení
    return randomSurname;//vrací příjmení
  }

  else if (sex==="female"){//podmínka pro ženské
    let randomSurname = getRandomFromSurnames(femaleSurnames);//volání funkce pro vybrání náhodného příjmení
    return randomSurname;//vrací příjmení
  }

};
function getRandomWorkload() {//funkce pro vybrání náhodného pracovního úvazku podle 4 zadaných možností

    return Workload[Math.floor(Math.random() * Workload.length)];// vrací nám přesné nahodnou pozici ve zvoleném řetězci podle jeho délky

};
function generateEmployee() {//funkce pro vytvoření zaměstnance podle zadaných kritérií

  let gender = randomsex();// volání funkce pro přiřazení pohlaví do proměnné

  let person = {//vytvoření objektu "person"(zaměstnanec)
    "gender": gender,//přiřazení pohlaví
    birthdate: getRandomBirthday(dtoIn.age.min,dtoIn.age.max),//volání funkce pro nahodně generované datum narození ve formátu ISO se vstupy vybranými z dtoIn které uživatel může konfigurovat
    name: chooseName(gender),//volání funkce pro přiřazení náhodného jména se vstupním prvkem gender(pohlaví zaměstnance)
    surname : chooseSurname(gender),//volání funkce pro přiřazení náhodného příjmení se vstupním prvkem gender(pohlaví zaměstnance)
    workload : getRandomWorkload()//volání funkce pro náhodné přiřazení pracovního úvazku
  };

return person;//vrací vytvořený objekt
}

const employeelist =[]//deklarace konstanty pro list zaměstnanců

for ( let i=0; i < dtoIn.count; i++) {// funkce for která je ovládaná vstupem funkce dtoIn který může uživatel měnit
    let employee = generateEmployee();//volání funkce pro vytvoření náhodného zaměstance 
    employeelist.push(employee);//přiřazení předem vytvořeného zaměstannce do listu zaměstnanců
}

let dtoOut = employeelist //vytvoření výstupu a přiřazení do něj list zaměstnanců
return dtoOut//výstup funkce. seznam zaměstnanců
}

/**
 * Tato funkce nám složí pro vytvoření statistiks podle zadaného seznamu zaměstnanců, počítáme zde průmerný věk a úvazek ženských zaměstnancu,
 * median pracovních úvazků ze vsech zaměstnanců a medián všech věkuú, také tu máme pvýpočet průměrného věku a minimální a meximální věk. dělíme zde zaměstnace podle jejich pracovního úvazku 
 * @param {Array} employees containing all the mocked employee data
 * @returns {object} statistics of the employees
 */
export function getEmployeeStatistics(employees) {

function doAvrg(avrg){//funkce která nám vypočítá aritmetický průměr čísel v seznamu 
    
  if (avrg.length === 0) return NaN// pokud vložený seznam je prázdný navratná hodnota je NaN
  
  let finalavrg = 0; //vyytvoření proměnné pro výpočet
    
  for (let i=0; i<avrg.length; i++){//funkce for ve které sčítáme všechny prvky v seznamu probíhající tak dlouho podle délky seznamu
      finalavrg = finalavrg + avrg[i]//výpočet a jeho uložení do proměnné 
  };

  return finalavrg/avrg.length;//vrací aritmetický průměr(součet všech prvků dělený jejich počtem)

}
function doMedian(medi) {//funkce která nám vypočítá medián pro čísela v seznamu 
    
  const sorted = [...medi].sort((a, b) => a - b);//seřazení hodnot v seznamu
  const mid = Math.floor(sorted.length / 2);// výpočet pro zjištění poloviny

  if (sorted.length % 2 === 0) {//podmínka funkgující když počet prvků v seznamu je sudý
    return (sorted[mid - 1] + sorted[mid]) / 2;//vrací medián zadaného seznamu 
  }

  return sorted[mid];//vrací medián zadaného seznamu 

}
function getAge(birthdateIso) {//funkce pro zjistění věku zaměstnance

  const birth = new Date(birthdateIso);// konstanta ve formátu Date vzaná ze vstupní proměnné
  const now = new Date();//konstanta s časem "teď"
  
  return (now - birth) / (1000 * 60 * 60 * 24 * 365.2425);// vrací odečtení dvou datumů (JavaScript automaticky převede datumy na milisekundy) poté se vydělí počtem milisekund v roce 

}

const workloadFem = []//deklarace konstanty pro pracovní úvazek žen 
const workloadAll = []//deklarace konstanty pro pracovní úvazek všech zaměstnanců
const age = []//deklarace konstanty pro wěk všech zaměstnanců
const workloadCount = {};//deklarace konstanty pro typy pracovních úvazků

for ( let i=0; i < employees.length; i++) {//funkce for opakující se podle počtu zaměstnanců v seznamu

    age.push(getAge(employees[i].birthdate));// ukládáme do konstanty věk všech zaměstnanců pomocí volání funkd getAge do které vkládáme datum narození zaměstnace kterého vždy vybíráme pomocí proměnné i
    workloadAll.push(employees[i].workload);// ukládáme do konstanty pracovní úvazek všech zaměstnanců které vždy vybíráme pomocí proměnné i
    workloadCount[employees[i].workload] = (workloadCount[employees[i].workload] ?? 0) + 1;// ukládáme do konstanty typů pracovních úvazků podle typ daného úvazku který daný zaměstnanec má,
    
    if (employees[i].gender==="female"){// podmínka pokud je zaměstnanec žena 
        workloadFem.push(employees[i].workload);//uložíme do konstanty pracovní úvazek
    };

}

age.sort((a,b) => a - b)//seřadíme věk od nejmnešího k největsímu 
workloadAll.sort((a,b) => a - b)//seřadíme pracovní úvazeky od nejmnešího k největsímu 
const sortedByWorkload = [...employees].sort((a, b) => a.workload - b.workload);//seřadíme všechny zaměstnance v seznamu podle pracovního úvazku od nejmnešího k největsímu 
const avgWomen = doAvrg(workloadFem);//provedeme výpočet pro aritmetický průměr pracovních úvazků ženských zaměstnanců pomocí volání naší funkce

let dtoOut = {//vytvoření výstupu
  total: employees.length,//přiřazení počtu zaměstnanců

  workload10: workloadCount[10],//*přiřazení poču zamestnanců s daným pracovním úvazkem 
  workload20: workloadCount[20],//přiřazení poču zamestnanců s daným pracovním úvazkem 
  workload30: workloadCount[30],//přiřazení poču zamestnanců s daným pracovním úvazkem 
  workload40: workloadCount[40],//přiřazení poču zamestnanců s daným pracovním úvazkem 
  
  averageAge: Number(doAvrg(age).toFixed(1)),//přiřazení a výpočet průměrného věku voláním funkce pro výpočet aritmetického průměru a jeho zaokrouhlení
  minAge: Math.floor(age[0]),//přiřazení první (nejnižší hodnoty) v seznamu věku , minimální věk 
  maxAge: Math.floor(age[age.length-1]),//přiřazení poslení (neejvyšší hodnoty) v seznamu věku , maximální věk 
  medianAge: Math.floor(doMedian(age)),//přiřazení a výpočet mediánu všech věků pomocí volání naší funkce 
  medianWorkload:   doMedian(workloadAll),//přiřazení a výpočet mediánu všech pracovních úvazků půpomocí volání naší funkce 
  averageWomenWorkload: Number(avgWomen.toFixed(1)),//přiřazení a výpočet aritmatického průměru ženských zaměstnanců pomocí naší funkce a jeho zaokrouhlení
  sortedByWorkload: sortedByWorkload//přiřazení seznamu zaměstnanců ktrý jsme seřadili 

}

return dtoOut;//vrací násš objekt se všemi statistikami 
}