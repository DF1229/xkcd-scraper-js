import mongoose from "mongoose";

const comicSchema = new mongoose.Schema(
    {
        num: Number,
        title: String,
        alt: String,
        url: String,
        filename: String,
        comic: Buffer,
        createdAt: { type: Date, default: Date.now() }
    },
    {
        // Available on records
        methods:{

        },
        // Available on table
        statics: {
            async new(buffer, data) {
                try {
                    var nRec = await this.create({
                        num: data.num,
                        title: data.title,
                        alt: data.alt,
                        filename: data.filename,
                        url: data.url,
                        comic: buffer
                    });
                } catch(err) {
                    console.error(err);
                    return false;
                }
                return nRec;
            },
            async getNewestComicNum() {
                try {

                } catch(err) {
                    console.error(err);
                    return false;
                }
            }
        }
    }
)

const ComicModel = mongoose.model('comic', comicSchema);
export default ComicModel;