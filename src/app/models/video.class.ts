export class Video {

    id: string;
    url: string
    title: string
    description: string
    video_file: string
    poster_file : string
    created_at: string
    genre : string

    constructor(obj?: any) {
       
        this.id = obj ? obj.id : "";
        this.url = obj ? obj.url : "";
        this.title = obj ? obj.title : "";
        this.description = obj ? obj.description : "";
        this.video_file = obj ? obj.video_file : "";
        this.poster_file = obj ? obj.poster_file : "";
        this.created_at = obj ? obj.created_at : "";
        this.genre = obj ? obj.genre : "";
    }
    
  }