from PIL import Image
import os
from pathlib import Path
import sys

def optimize_gif(input_path, output_path, max_colors=256, quality=30, scale=0.50, skip_n_frames=2):
    """
    Optimize a GIF file to reduce its size while maintaining reasonable quality.
    
    Args:
        input_path (str): Path to input GIF file
        output_path (str): Path to save optimized GIF
        max_colors (int): Maximum number of colors (2-256)
        quality (int): Quality setting (1-100), lower means more compression
        scale (float): Scale factor to resize the GIF (default: 0.75)
        skip_n_frames (int): Keep only every nth frame (default: 2)
    """
    try:
        # Open the GIF file
        with Image.open(input_path) as img:
            # Get the frames from the GIF
            frames = []
            frame_count = 0
            try:
                while True:
                    # Only keep every nth frame
                    if frame_count % skip_n_frames == 0:
                        # Copy the current frame
                        frame = img.copy()
                        
                        # Scale the frame
                        new_size = tuple(int(dim * scale) for dim in frame.size)
                        frame = frame.resize(new_size, Image.Resampling.LANCZOS)
                        
                        # Quantize the frame to reduce colors
                        frame = frame.quantize(colors=max_colors, method=2)
                        
                        frames.append(frame)
                    
                    frame_count += 1
                    img.seek(img.tell() + 1)
            except EOFError:
                pass  # We've hit the end of the frames

            # Save the optimized GIF
            if frames:
                frames[0].save(
                    output_path,
                    save_all=True,
                    append_images=frames[1:],
                    optimize=True,
                    quality=quality,
                    loop=0
                )
                
            # Print size reduction info
            original_size = os.path.getsize(input_path) / (1024 * 1024)  # MB
            compressed_size = os.path.getsize(output_path) / (1024 * 1024)  # MB
            reduction = ((original_size - compressed_size) / original_size) * 100
            
            print(f"File: {os.path.basename(input_path)}")
            print(f"Original size: {original_size:.2f} MB")
            print(f"Compressed size: {compressed_size:.2f} MB")
            print(f"Size reduction: {reduction:.1f}%")
            print("-" * 50)
            
    except Exception as e:
        print(f"Error processing {input_path}: {str(e)}")

def main():
    # Check if input directory is provided
    if len(sys.argv) < 2:
        print("Usage: python script.py <input_directory> [output_directory]")
        sys.exit(1)
    
    input_dir = Path(sys.argv[1])
    output_dir = Path(sys.argv[2]) if len(sys.argv) > 2 else input_dir / "optimized"
    
    # Create output directory if it doesn't exist
    output_dir.mkdir(exist_ok=True)
    
    # Process all GIF files in the input directory
    gif_files = list(input_dir.glob("*.gif"))
    
    if not gif_files:
        print(f"No GIF files found in {input_dir}")
        sys.exit(1)
    
    print(f"Found {len(gif_files)} GIF files to process")
    print("Starting optimization...\n")
    
    for gif_file in gif_files:
        output_path = output_dir / f"optimized_{gif_file.name}"
        optimize_gif(str(gif_file), str(output_path))
    
    print("\nOptimization complete!")

if __name__ == "__main__":
    main()