from fastapi import FastAPI
from pydantic import BaseModel
from transformers import LlamaForCausalLM, LlamaTokenizer
import torch

app = FastAPI()

# Load model and tokenizer
model_path = "/home/trader/oasis/consolidated.00.pth"
tokenizer = LlamaTokenizer.from_pretrained(model_path)
model = LlamaForCausalLM.from_pretrained(model_path)
model.eval()

# Define input data model
class TextGenerationRequest(BaseModel):
    prompt: str
    max_length: int = 50

# API route for generating text
@app.post("/generate")
def generate_text(request: TextGenerationRequest):
    # Tokenize the input prompt
    inputs = tokenizer(request.prompt, return_tensors="pt")

    # Generate text
    with torch.no_grad():
        outputs = model.generate(inputs['input_ids'], max_length=request.max_length)

    # Decode the generated text
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return {"generated_text": generated_text}

