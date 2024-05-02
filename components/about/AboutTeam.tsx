import Image from 'next/image'
import React from 'react'

export default function AboutTeam() {
  const team = [
    {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      imageUrl:
        '/rider/deliveryguy.png',
    },{
      name: 'Michael',
      role: 'Co-Founder',
      imageUrl:
      '/rider/deliveryguy.png',
    },
  ]
  return (
    <div>
      <div className="mx-auto mt-7 max-w-7xl px-6 sm:mt-48 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">

          <h1 className="mt-10 text-4xl font-bold tracking-tight text-black sm:text-6xl">
                  The Team
                </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Sit facilis neque ab nulla vel. Cum eos in laudantium. Temporibus eos totam in dolorum. Nemo vel facere
              repellendus ut eos dolores similique.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
          >
            {team.map((person) => (
              <li key={person.name}>
               <Image
               className="mx-auto h-24 w-24 rounded-full" src={person.imageUrl} alt="team"
                width={100}
                height={100} />
                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                <p className="text-sm leading-6 text-gray-600">{person.role}</p>
              </li>
            ))}
          </ul>
        </div>
    </div>
  )
}
