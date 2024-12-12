@@ .. @@
   return (
     <div>
       <div className="flex items-center justify-between mb-8">
         <h2 className={`text-5xl font-bold bg-gradient-to-r from-${
           theme === 'dark' ? 'white' : 'gray-900'
         } to-gray-500 bg-clip-text text-transparent`}>
           Featured
         </h2>
         <Tabs 
           selectedKey={showType}
           onSelectionChange={(key) => setShowType(key as 'channels' | 'guests')}
           size="sm"
           classNames={{
             tabList: `${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'} p-1 rounded-lg`,
             cursor: `${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`,
             tab: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} data-[selected=true]:${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
             tabContent: "group-data-[selected=true]:text-inherit"
           }}
         >
-          <Tab key="channels" title="Featured Channels" />
           <Tab key="guests" title="Famous Guests" />
+          <Tab key="channels" title="Featured Channels" />
         </Tabs>
       </div>
 
-      {showType === 'channels' ? <FeaturedChannels /> : <FamousGuests />}
+      {showType === 'guests' ? <FamousGuests /> : <FeaturedChannels />}
 
       {/* Premium Banner */}
       <div className={`mt-8 ${