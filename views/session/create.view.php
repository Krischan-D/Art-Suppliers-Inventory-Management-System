<?php require base_path('views/partials/head.php') ?>

<nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200  ">
  <div class="px-3 py-3 lg:px-5 lg:pl-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-start rtl:justify-end">
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
        <a href="https://flowbite.com" class="flex ms-2 md:me-24">
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 me-3" alt="FlowBite Logo" />
          <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ">Artventory</span>
        </a>
      </div>
      <!-- <div class="flex items-center">
          <div class="flex items-center ms-3 gap-2">
            <div>
              <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
              </button>
             
            </div>
            <span>admin</span>
          </div>
        </div> -->
    </div>
  </div>
</nav>

<main>
    <div class="mx-auto max-w-7xl h-screen px-4 py-6 sm:px-6 lg:px-8 ">
        <div class="flex max-w-sm mx-auto mt-20   max-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white shadow-md rounded-xl">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
                <h2 class="mt-10 text-center text-2xl/9 tracking-tight text-gray-700">Log in to your Account </h2>
                <p class="text-center text-sm text-gray-500">See what is going on with your business</p>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                <form class="space-y-6" action="/session" method="POST">
                    
                <div>
                        <label for="username" class="block text-sm/6 font-medium text-gray-500">Username</label>
                        <div class="mt-2">
                            <input type="text" name="username" id="username"   placeholder="Enter username"    class="block w-full border border-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                            <span class="text-xs text-red-400"><?= $errors['email'] ??  '';  ?></span>
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm/6 font-medium text-gray-500">Password</label>
                            
                        </div>
                        <div class="mt-2">
                            <input type="password" name="password" id="password" autocomplete="current-password" placeholder="Enter password"  class="<?=  $errors['password'] ? 'border-red' : 'border-2' ?> block border border-2 w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                            <span class="text-xs text-red-400"><?=  $errors['password'] ??  '';  ?></span>
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                    </div>
                </form>

       
            </div>
        </div>


    </div>





</main>
<?php require base_path('views/partials/footer.php') ?>