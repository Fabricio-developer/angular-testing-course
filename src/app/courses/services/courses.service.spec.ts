import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { CoursesService } from "./courses.service";
import { COURSES } from "../../../../server/db-data";

describe("CoursesService", () => {
  let coursesService: CoursesService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("should return all the courses", () => {
    coursesService.findAllCourses().subscribe((courses) => {
      expect(courses.length).toBe(
        12,
        "The given number of courses are not equal to 12"
      );

      const course = courses.find((c) => c.id == 12);

      expect(course.titles.description).toBe("Angular Testing Course");
    });

    const req = httpTestingController.expectOne("/api/courses");

    expect(req.request.method).toEqual("GET");

    req.flush({ payload: Object.values(COURSES) });
  });

  it("should return only one course", () => {
    coursesService.findCourseById(12).subscribe((course) => {
      expect(course).toBeTruthy();
      expect(course.id).toEqual(12);

      expect(course.titles.description).toBe("Angular Testing Course");
    });

    const req = httpTestingController.expectOne("/api/courses/12");

    expect(req.request.method).toEqual("GET");

    req.flush(COURSES[12]);
  });

  afterEach(() => {

    console.log('verify test');

    httpTestingController.verify();
  } )
});
