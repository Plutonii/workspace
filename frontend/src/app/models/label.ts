export class Label {
  id: number;
  title: string;
  colorId: number;

  constructor(id, title, colorId) {
    this.id = id;
    this.title = title;
    this.colorId = colorId;
  }

  deleteInArray(array: Array<Label>) {
    const index: number = array.findIndex((value) => {
      if (value.id === this.id) return true;
    });
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
