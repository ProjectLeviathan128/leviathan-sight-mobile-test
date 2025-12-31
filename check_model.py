
import onnxruntime as ort
import sys
import os

model_path = "public/best.onnx"

print(f"Checking model at: {model_path}")

if not os.path.exists(model_path):
    print("Error: File not found.")
    sys.exit(1)

try:
    session = ort.InferenceSession(model_path)
    print("✅ Model loaded successfully!")
    
    print("\n--- Inputs ---")
    for i in session.get_inputs():
        print(f"Name: {i.name}, Shape: {i.shape}, Type: {i.type}")

    print("\n--- Outputs ---")
    for o in session.get_outputs():
        print(f"Name: {o.name}, Shape: {o.shape}, Type: {o.type}")
        
    meta = session.get_modelmeta()
    print("\n--- Metadata ---")
    print(f"Producer: {meta.producer_name}")
    print(f"Graph Name: {meta.graph_name}")
    print(f"Version: {meta.version}")
    
except Exception as e:
    print(f"❌ Failed to load model: {e}")
    sys.exit(1)
