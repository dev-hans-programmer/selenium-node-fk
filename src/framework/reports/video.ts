import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

class VideoRecording {
   private outputFilePath: string;
   private recording: any;

   constructor(outputFilePath: string) {
      this.outputFilePath = outputFilePath;
      this.recording = null;
   }

   startRecording() {
      this.recording = ffmpeg()
         .input('desktop')
         .inputOptions(['-f x11grab', '-s 1920x1080', '-i :0.0+0,0'])
         .outputOptions(['-r 30', '-an'])
         .output(this.outputFilePath)
         .on('end', () => {
            console.log('Video recording finished.');
         })
         .on('error', (err) => {
            console.error('Error in video recording:', err);
         })
         .run();
   }

   stopRecording() {
      if (this.recording) {
         this.recording.kill();
      }
   }
}

export default VideoRecording;
