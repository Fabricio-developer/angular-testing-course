import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";
import { TestBed } from '@angular/core/testing';


describe("CalculatorService", () => {
  let calculator: CalculatorService, loggerSpy: any;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj("loggerService", ["log"]);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {provide: LoggerService, useValue: loggerSpy}
      ]
    })

    calculator = TestBed.inject(CalculatorService);
  });


  it("should sum two numbers", () => {

    const sum = calculator.add(2, 2);

    expect(sum).toBe(4);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it("should substract two numbers", () => {
    const sum = calculator.subtract(2, 2);

    expect(sum).toBe(0);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
