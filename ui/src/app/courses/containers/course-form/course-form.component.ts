import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../model/category';
import { CourseRequest } from '../../services/requests/course-request';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit, AfterViewInit {
  form!: FormGroup;

  categories: Category[] = [];
  isLoadingCategories = false;

  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly courseService: CoursesService,
    private readonly categoryService: CategoriesService,
    private readonly dialog: MatDialog,
    private readonly snack: MatSnackBar,
    private readonly detectChangesRef: ChangeDetectorRef,
    private readonly title: Title,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    protected readonly formUtilsService: FormUtilsService
  ) { }

  ngOnInit(): void {
    this.initTitle();
    this.loadCategories();
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.nameInput.nativeElement.focus();
    this.detectChangesRef.detectChanges();
  }

  get lessonsFormArray() {
    const lessonsForms = <UntypedFormArray>this.form.get('lessons')
    return lessonsForms.controls
  }

  onSubmit() {
    if (this.form.value.id) {
      this.onEdit();
    } else {
      this.onSave();
    }
  }

  onClickCancel() {
    this.location.back();
  }

  
  includeLessonForm() {
        const lessonsForms = <UntypedFormArray>this.form.get('lessons');
        const emptyLesson = this.createLesson();
        lessonsForms.push(emptyLesson);
  }

  removeByIndexLessonForm(index: number) {
    const lessonsForms = <UntypedFormArray>this.form.get('lessons');
    lessonsForms.removeAt(index);
  }

  private retrieaveLessons(course: Course): FormGroup[] {
    const lessons = [] as FormGroup[]
    if (course?.lessons.length > 0) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      const emptyLesson = this.createLesson();
      lessons.push(emptyLesson)
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = {
    id: '',
    name: '',
    youtubeUrl: ''
  }): FormGroup {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      youtubeUrl: [lesson.youtubeUrl, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11)
      ]],
    })
  }

  private onSave() {
    if (this.form.valid) {
      const category = this.categories.find(category => category.id === this.form.value.category)
      if (category === undefined) {
        throw new Error('category not found')
      }
      const params = {
        name: this.form.value.name,
        categoryId: category.id,
        lessons: this.form.value.lessons
      } as CourseRequest
      this.courseService.save(params).subscribe({
        next: () => this.onSaveSuccess(),
        error: (err: Error) => this.onSaveError(err)
      })
    } else {
      this.formUtilsService.validateAllFormFields(this.form);
    }
  }

  private onEdit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      const category = this.categories.find(category => category.id === this.form.value.category)
      if (category === undefined) {
        throw new Error('category not found')
      }
      const params = {
        name: this.form.value.name,
        categoryId: category.id,
        lessons: this.form.value.lessons
      }
      this.courseService.edit(this.form.value.id!, params).subscribe({
        next: () => this.onEditSuccess(),
        error: (err: Error) => this.onEditError(err)
      })
    }
  }

  private loadCategories(): void {
    this.isLoadingCategories = true;
    this.categoryService.list()
    .subscribe({
      next: categories => {
        this.categories = categories
        this.isLoadingCategories = false;
      }
    });
  }

  private initForm() {
    const course = this.route.snapshot.data['course'] as Course;
    if(!course) {
      return 
    }
    this.form = this.formBuilder.group({
      id: [course.id,],
      name: [course.name, [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
      ]],
      category: [course.category.id, Validators.required],
      lessons: this.formBuilder.array(this.retrieaveLessons(course), [Validators.required])
    });
  }

  private onEditSuccess() {
    this.clearForm();
    this.nameInput.nativeElement.focus();
    this.showSnackMessage('Curso atualizado!');
    this.location.back();
  }

  private onEditError(err: Error): void {
    this.showModalMessage('Atenção!', 'Não foi possível atualizar o curso.')
  }

  private onSaveSuccess() {
    this.clearForm();
    this.nameInput.nativeElement.focus();
    this.showSnackMessage('Curso adicionado!');
  }

  private onSaveError(err: Error): void {
    this.showModalMessage('Atenção!', 'Não foi possível criar um novo curso.')
  }

  @HostListener('document:keydown.alt.s', ['$event'])
  private handleEnterKey(event: KeyboardEvent) {
    this.onSave();
  }

  @HostListener('document:keydown.esc', ['$event'])
  private handleEscKey(event: KeyboardEvent) {
    this.onClickCancel();
  }

  @HostListener('document:keydown.alt.l', ['$event'])
  private handleAltL(event: KeyboardEvent) {
    this.includeLessonForm()
  }

  private showSnackMessage(message: string) {
    const config = {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    } as MatSnackBarConfig;
    this.snack.open(message, "Fechar", config);
  }

  private showModalMessage(title: string, content: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        title: title,
        content: content
      }
    });
  }

  private clearForm() {
    this.form.reset({
      name: '',
      category: '',
    });
  }

  private initTitle() {
    this.title.setTitle('Curso | Novo curso')
  }
}
