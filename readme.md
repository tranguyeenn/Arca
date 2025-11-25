Frontend Stack:
React (Vite + Typescript + React Compiler) 
Vite is for dev server

Tailwind CSS (more readable and responsive version of css)
^^^ also allows for styling within html itself




Backend:
Use supabase to store everything and just use edge functions for backend logic


Deployment:
 - use vercel to host since its a dynamic site



Folder Structure:
node_modules/ (never touch this shit it has all the libraries like react, vite, etc.)

public/ (files that vite can access, usually just images and icons, dont worry about it too much)


src/ (most important folder, contains all of the devlopment stuff)

src/assets (stores images, logo, icons, very important for anywhere where you'll have images and stuff)

src/App.tsx (basically wrapper ofd the whole website)

src/Main.tsx (loads global css, dont really need to modify this)

src/Index.css (basically your global css file, just add any styling that needs to be app wide e.g a color scheme palette in here)

src/App.css (Literally just component specific styling for App.tsx, dont need to use this when using tailwind at all, can just delete it)



Random Tips:
-npm run dev (this command will run your website locally)
-npm install (this installs add node modules/dependencies; please run after cloning repo initially)
-npm run build (this builds hte production version, please do this before pushing to deployment branch / main or it wont work)
-npm run preview (lets you test the build locally)
-npm install package-name (this is how you can install packages)
-npm update (updates all dependencies)

-PLEASE PLEASE PLEASE make a dev branch do not push to main this is how you break the whole fucking thing; At the very least make a dev branch that everybody can work on and to test locally THEN push stuff into main to actually be deployed w/ vercel


ideally you guys should make feature branches and make a branch specifically for the specific feature you guys are working on. Literally just make a branch and write code just for that feature then either make a pull request for someone to review then merge it into main.




NOTE: Lowkey just use chatgpt and learn as you go thats what i did with alphora because if you try to learn all of this js reading documentation and going manually its gonna take alot longer than it should (ask chatgpt hella questions too evern for anything you dont understand and have it memorize the whole idea of yall's project and what stack it uses and everything)


