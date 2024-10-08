from openai import OpenAI
import json

client = OpenAI(
    # This is the default and can be omitted
    api_key="",
)
# Function to generate flashcards with questions, answers, and hints
def generate_flashcards(topic, num_flashcards=5):

    # Define the function parameters schema
    flashcard_function = {
        "name": "generate_flashcards",
        "description": "Generate flashcards with questions, answers, and hints in a structured JSON array.",
        "parameters": {
            "type": "object",
            "properties": {
                "flashcards": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "question": {"type": "string"},
                            "answer": {"type": "string"},
                            "hint": {"type": "string"}
                        },
                        "required": ["question", "answer", "hint"]
                    }
                }
            },
            "required": ["flashcards"]
        }
    }

    messages = [
        {"role": "system", "content": "You are a helpful assistant that generates flashcards."},
        {"role": "user", "content": f"Generate {num_flashcards} flashcards about {topic}."}
    ]

    # Make the API request using the new format
    response = client.chat.completions.create(
        model="gpt-4-turbo",  # Replace with the correct model; "gpt-4o-mini" is not valid
        messages=messages,  # Messages should come before the function calls
        functions=[flashcard_function],  # Provide the function definition to ensure JSON output
        function_call={"name": "generate_flashcards"},  # Invoke the specific function
        max_tokens=500,  # Adjust based on expected length of response
        temperature=0.5  # Temperature can be adjusted to control randomness
    )


    # Process the response text as JSON
    try:
        # Extract the arguments from the function call response
        flashcards_json = response.choices[0].message.function_call.arguments
        flashcards = json.loads(flashcards_json)
        return flashcards
    except json.JSONDecodeError:
        return {"error": "Failed to parse the response as JSON."}
    except Exception as e:
        return {"error": str(e)}  # Catch any other unexpected errors

# Example usage
topic = "Science"
flashcards = generate_flashcards(topic, num_flashcards=5)
print(flashcards)
