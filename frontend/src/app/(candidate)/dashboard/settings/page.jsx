"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "lucide-react";

export default function SettingsPage() {
  // States for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // States for switch toggles
  const [profilePublic, setProfilePublic] = useState(true);
  const [resumePublic, setResumePublic] = useState(false);
  
  // States for checkboxes
  const [notifyShortlisted, setNotifyShortlisted] = useState(true);
  const [notifySaved, setNotifySaved] = useState(false);
  const [notifyExpire, setNotifyExpire] = useState(false);
  const [notifyRejected, setNotifyRejected] = useState(true);
  const [notifyJobAlerts, setNotifyJobAlerts] = useState(true);

  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-semibold mb-6">Settings</h2>
      
      {/* Notification Section */}
      <div className="mb-10">
        <h3 className="text-lg font-medium mb-4">Notification</h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="notify-shortlisted" 
              checked={notifyShortlisted}
              onCheckedChange={setNotifyShortlisted}
            />
            <label htmlFor="notify-shortlisted" className="text-sm">
              Notify me when employers shortlisted me
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="notify-saved" 
              checked={notifySaved}
              onCheckedChange={setNotifySaved}
            />
            <label htmlFor="notify-saved" className="text-sm">
              Notify me when employers saved my profile
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="notify-expire" 
              checked={notifyExpire}
              onCheckedChange={setNotifyExpire}
            />
            <label htmlFor="notify-expire" className="text-sm">
              Notify me when my applied jobs are expire
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="notify-rejected" 
              checked={notifyRejected}
              onCheckedChange={setNotifyRejected}
            />
            <label htmlFor="notify-rejected" className="text-sm">
              Notify me when employers rejected me
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="notify-alerts" 
              checked={notifyJobAlerts}
              onCheckedChange={setNotifyJobAlerts}
            />
            <label htmlFor="notify-alerts" className="text-sm">
              Notify me when I have up to 5 job alerts
            </label>
          </div>
        </div>
      </div>
      
      {/* Privacy Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-3">Profile Privacy</h3>
          <div className="flex items-center justify-between">
            <Switch 
              id="profile-privacy" 
              checked={profilePublic}
              onCheckedChange={setProfilePublic}
            />
            <div className="ml-3">
              <label htmlFor="profile-privacy" className="text-sm font-medium">
                {profilePublic ? "YES" : "NO"}
              </label>
              <p className="text-sm text-gray-500">
                Your profile is {profilePublic ? "public" : "private"} now
              </p>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-3">Resume Privacy</h3>
          <div className="flex items-center justify-between">
            <Switch 
              id="resume-privacy" 
              checked={resumePublic}
              onCheckedChange={setResumePublic}
            />
            <div className="ml-3">
              <label htmlFor="resume-privacy" className="text-sm font-medium">
                {resumePublic ? "YES" : "NO"}
              </label>
              <p className="text-sm text-gray-500">
                Your resume is {resumePublic ? "public" : "private"} now
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Change Password Section */}
      <div className="mb-10">
        <h3 className="text-lg font-medium mb-4">Change Password</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <div className="relative">
              <Input 
                type={showCurrentPassword ? "text" : "password"} 
                placeholder="Password" 
                className="pr-10"
              />
              <button 
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          <div className="relative">
            <label className="block text-sm font-medium mb-1">New Password</label>
            <div className="relative">
              <Input 
                type={showNewPassword ? "text" : "password"} 
                placeholder="Password" 
                className="pr-10"
              />
              <button 
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <div className="relative">
              <Input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Password" 
                className="pr-10"
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
      </div>
      
      {/* Delete Account Section */}
      <div>
        <h3 className="text-lg font-medium mb-2">Delete Your Account</h3>
        <p className="text-sm text-gray-500 mb-4">
          If you delete your JobJob account, you will no longer be able to get information 
          about the matched jobs, following employers, and job alert, shortlisted jobs and 
          more. You will be abandoned from all the services of JobJob.com.
        </p>
        <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600">
          Close Account
        </Button>
      </div>
    </div>
  );
}
