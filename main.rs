// Rust Backend Logic for Gen-Z Vibe Translator
use std::collections::HashMap;

fn translate_to_genz(text: &str, lang: &str) -> String {
    let mut bn_dict = HashMap::new();
    bn_dict.insert("পড়াশোনা", "Bro is locked in studying fr fr 💀");
    bn_dict.insert("ঘুমাচ্ছি", "Sleeping like a absolute blud 🛌");
    bn_dict.insert("খাবার", "Bro is cooking and left no crumbs 🍽️");

    let mut hi_dict = HashMap::new();
    hi_dict.insert("पढ़ाई", "Bro is locked in studying fr fr 💀");
    hi_dict.insert("सो रहा हूँ", "Sleeping like a absolute blud 🛌");

    let mut or_dict = HashMap::new();
    or_dict.insert("ପଢ଼ିବା", "Bro is locked in studying fr fr 💀");
    or_dict.insert("ଶୋଉଛି", "Sleeping like a absolute blud 🛌");

    let result = match lang {
        "hi" => hi_dict.get(text).cloned(),
        "or" => or_dict.get(text).cloned(),
        _ => bn_dict.get(text).cloned(),
    };

    match result {
        Some(slang) => slang.to_string(),
        None => format!("\"{}\" — blud really said this fr fr 💀 W mindset 🗿", text),
    }
}

fn main() {
    // Testing the Rust function logic locally
    let output = translate_to_genz("পড়াশোনা", "bn");
    println!("Rust Output: {}", output);
}
