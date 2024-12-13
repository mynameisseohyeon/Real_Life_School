export const calculateSalary = (salaryType, severanceIncluded, salary, nonTaxableIncome, dependents, children) => {
    let grossSalary = parseFloat(salary); 
    const nonTaxableAmount = parseFloat(nonTaxableIncome);

    // 연봉을 월급으로 변환
    if (salaryType === '연봉') {
        // 퇴직금 포함 여부에 따라 연봉을 나누는 기준이 달라짐
        if (severanceIncluded) {
            grossSalary = grossSalary / 13; // 퇴직금 포함시 연봉을 13으로 나눔
        } else {
            grossSalary = grossSalary / 12; // 퇴직금 미포함시 연봉을 12로 나눔
        }
    }

    // 비과세액 제외 후 계산
    let taxableSalary = grossSalary - nonTaxableAmount;

    // 각종 공제액 계산
    const nationalPension = Math.floor(taxableSalary * 0.045);
    const healthInsurance = Math.floor(taxableSalary * 0.03545);
    const longTermCare = Math.floor(healthInsurance * 0.1295);
    const employmentInsurance = Math.floor(taxableSalary * 0.009);

    // 소득세 계산 
    const calculateIncomeTax = (salary, dependents, children) => {
        let tax = 0;

        // 간이세액표에 맞게 계산 
        if (salary <= 12000000) {
            tax = salary * 0.06; 
        } else if (salary <= 46000000) {
            tax = salary * 0.15;
        } else {
            tax = salary * 0.25;
        }

        // 부양가족 공제 
        tax -= dependents * 125000;

        // 20세 이하 자녀 공제 
        tax -= children * 150000;

        // 최소 세액 0원 
        return Math.max(0, tax);
    };

    // 소득세 계산
    const incomeTax = Math.floor(calculateIncomeTax(taxableSalary, dependents, children));

    // 지방소득세 (소득세의 10%)
    const localIncomeTax = Math.floor(incomeTax * 0.1);

    // 총 공제액
    const totalDeductions = nationalPension + healthInsurance + longTermCare + employmentInsurance + incomeTax + localIncomeTax;

    // 실수령액 (급여 - 공제액)
    const netSalary = grossSalary - totalDeductions;

    return {
        netSalary: Math.floor(netSalary), // 실수령액 소수점 제거
        nationalPension,
        healthInsurance,
        longTermCare,
        employmentInsurance,
        incomeTax,
        localIncomeTax,
        totalDeductions
    };
};
