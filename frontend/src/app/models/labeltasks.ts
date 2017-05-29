export class LabelTasks {
  id: number;
  labelId: number;
  taskId: number;

  constructor() {
  }

  deleteInArray(array: Array<LabelTasks>) {
    const index: number = array.findIndex((value) => {
      if (value.id === this.id) return true;
    });
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  cloneOfObjectToLabelTasks(o: any): void {
    this.id = o.id;
    this.labelId = o.labelId;
    this.taskId = o.taskId;
  }
}
