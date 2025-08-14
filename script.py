# Let me read the updated app.js content and create the downloadable file
with open('app.js', 'r', encoding='utf-8') as f:
    app_js_content = f.read()

# Save it as a downloadable file
print("Creating downloadable app.js file...")
print(f"File size: {len(app_js_content)} characters")

# Let me create a smaller version first to check the content
print("\nChecking key updates in the JavaScript:")
if 'updateCompetitionSpecificContent' in app_js_content:
    print("✅ Dynamic content function found")
if '60 minutes before kickoff' in app_js_content:
    print("✅ 60-minute deadline found")
if 'players on court' in app_js_content:
    print("✅ Futsal text found")

# Check if there are any 45-minute references left
if '45 minutes' in app_js_content:
    print("⚠️ Still contains 45-minute references")
else:
    print("✅ No old 45-minute references found")