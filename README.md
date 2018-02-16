# EricLease
Personal site for testing and demonstrating web technologies.

Most of the documentation in the ASP.NET sphere which also discusses modern client side technologies (webpack, TypeScript, etc.) assumes .NET Core.

A lot of .NET developers are still forced (or maybe prefer) to use .NET 4.x.

The goal with this project is to incorporate the client side technologies that I want to use with the antiquated server technology that I may have to use for some time.

A few constraints I've imposed on myself regarding the project structure and dev environment:
- single web application project for both server and client apps (a byproduct of an older paradigm that is still rampant in enterprise application development)
- landing page is served as a traditional ASP.NET MVC View
- leverage webpack-dev-server for HMR
- use webpack exclusively for building, processing, and bundling client app (this means not relying on ASP.NET's release bundles for minification, cache busting, etc.)
- be able to develop client app quickly through using visual studio (this basically means using Local IIS so I don't have to stop/start IIS express if I want to add files to the project)
- host multiple client frameworks (React, Vue, Angular) within that single project
- configure webpack to handle the nuances of building multiple client applications based on different frameworks

*Yes*, I am aware that some of these constraints do not make a lot of sense.  Why wouldn't I just separate the API from the client apps?  As I eluded to above, I have personally seen this lingering paradigm, of one project hosting both client and server code, too many times.  Ideally I would separate the projects, but there are these things called deadlines, and business requirements that tend to take precedence.  In those situations you have to work within the constraints you have.  Also, I'm just curious to see if I can make it work before losing what little hair I have left.
