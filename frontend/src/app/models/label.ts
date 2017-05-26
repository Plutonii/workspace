export class Label {
  id: number;
  title: string;
  colourId: number;
  projectId: number;

  constructor() {
  }

  deleteInArray(array: Array<Label>) {
    const index: number = array.findIndex((value) => {
      if (value.id === this.id) return true;
    });
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  cloneOfObjectToLabel(o: any): void {
    this.id = o.id;
    this.title = o.title;
    this.colourId = o.colourId;
    this.projectId = o.projectId;
  }
}
