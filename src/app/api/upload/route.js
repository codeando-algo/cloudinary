import { NextResponse } from "next/server";
import {writeFile} from 'fs/promises';
import {v2 as cloudinary} from 'cloudinary';
import path from "path";

          
cloudinary.config({ 
  cloud_name: 'dhrfviws9', 
  api_key: '932495218998985', 
  api_secret: 'YZnYXcKOKTAr1yCp6NzrTmGWT1k' 
});

export async function POST(request) {
    const data =  await request.formData();
    const image = data.get('image')

    if (!image){
        return NextResponse.json("no se ha subido ninguna imagen", { status: 
        400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

// guardar en un archivo
    //const filePath = path.join(process.cwd(), 'public', image.name); 
    //await writeFile(filePath, buffer)

const response = await new Promise((resolve, reject) => {

    cloudinary.uploader.upload_stream({}, (err, result) => {
        if (err) {
            reject(err);
        }
        resolve(result);
    }).
    end(buffer);
    });

    

    return NextResponse.json({
        message: "Imagen subida",
        url: response.secure_url
    });
}
