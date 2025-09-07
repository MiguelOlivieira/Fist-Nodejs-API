new OneToHundredStream()
        .pipe(new ConvertToNegativeNumberStream())
        .pipe(new MultiplyByTenStream())